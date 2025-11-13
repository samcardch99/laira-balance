import React, { useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";
import { useTranslations } from "../../i18n/utils";

export default function HomeFooter({
  className = "text-secondary",
  buttonClass = "lightPink",
  language = "es",
}) {
  const t = useTranslations(language);
  const formSchema = useFormSchema(t);
  const formRef = useRef(null);

  function useFormSchema(t) {
    return useMemo(
      () =>
        z.object({
          username: z.string().min(2, t("form.name.error")),
          email: z.string().email(t("form.email.error")),
          message: z.string().min(10, t("form.message.error")),
          terms: z.literal(true, {
            errorMap: () => ({
              message: t("form.terms.error"),
            }),
          }),
        }),
      []
    );
  }

  // ✅ 2. useForm inicializado 1 sola vez
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
      terms: false,
    },
    mode: "onSubmit", // evita re-render al tipear
  });

  const onSubmit = async (data) => {
    if (!formRef.current) return;
    try {
      await emailjs.sendForm(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY }
      );
      toast.success(t("footer.form.success.title.success"), {
        description: t("footer.form.success"),
      });
      reset();
    } catch {
      toast.error(t("footer.form.success.title.fail"), {
        description: t("footer.form.error"),
      });
    }
  };

  return (
    <div className="w-full mt-7 mb-7 lg:mt-0 lg:mb-0 lg:w-1/3 z-50 max-w-[30rem]">
      <Toaster client:idle />

      <h2
        className={`italic text-2xl font-bold ${className} w-4/5 md:w-3/5 mb-4`}
      >
        {t("footer.form.title")}
      </h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-2 flex flex-col items-start w-full  ${className}`}
      >
        <label className="text-sm ">{t("footer.form.name")}</label>
        <input
          {...register("username")}
          placeholder={t("form.username")}
          className="w-2/3  placeholder:text-xs placeholder:pl-1 pl-1 py-1"
        />
        {errors.username && (
          <p className="text-sm text-red-900">{errors.username.message}</p>
        )}
        <label className="text-sm ">{t("footer.form.email")}</label>

        <input
          {...register("email")}
          placeholder={t("form.email")}
          className="w-2/3 placeholder:text-xs placeholder:pl-1 py-1 pl-1"
        />
        {errors.email && (
          <p className="text-sm text-red-900">{errors.email.message}</p>
        )}

        {/* <input {...register("phone")} placeholder={t("form.phone")} />
      {errors.phone && <p>{errors.phone.message}</p>} */}
        <label className="text-sm ">{t("footer.form.message")}</label>

        <textarea
          {...register("message")}
          placeholder={t("form.message")}
          className="w-full placeholder:text-sm placeholder:p-1 py-1 pl-1"
        />
        {errors.message && (
          <p className="text-sm text-red-900">{errors.message.message}</p>
        )}

        <label className="flex gap-2">
          <input
            type="checkbox"
            {...register("terms")}
            className="cursor-pointer"
          />{" "}
          {t("form.terms")}
        </label>
        {errors.terms && (
          <p className="text-sm text-red-900">{errors.terms.message}</p>
        )}
        <input type="hidden" name="name" />
        <input type="hidden" name="email" />
        <input type="hidden" name="message" />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-xl ${buttonClass} px-3 py-2`}
        >
          {isSubmitting ? t("form.sending") : t("form.button")}
        </button>
      </form>
    </div>
  );
}
