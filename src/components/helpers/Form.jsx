import React, { useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

// ✅ 1. Memoizamos el schema para no recalcularlo en cada render
function useFormSchema() {
  return useMemo(
    () =>
      z.object({
        username: z.string().min(2, "Escriba un nombre válido"),
        email: z.string().email("Escriba un email válido"),
        message: z
          .string()
          .min(10, "Escriba un mensaje de al menos 10 caracteres"),
        terms: z.literal(true, {
          errorMap: () => ({
            message: "Debe aceptar los términos y condiciones",
          }),
        }),
      }),
    []
  );
}

export default function HomeFooter({
  className = "text-secondary",
  buttonClass = "lightPink",
}) {
  const formSchema = useFormSchema();
  const formRef = useRef(null);

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
      toast.success("Correcto", {
        description: "Su mensaje ha sido enviado con éxito.",
      });
      reset();
    } catch {
      toast.error(
        "Su mensaje no pudo ser enviado. Inténtelo de nuevo más tarde."
      );
    }
  };
  const t = (key) => {
    const translations = {
      "form.username": "Jhon Doe",
      "form.email": "jhon@gmail.com",
      "form.phone": "305 123 4567",
      "form.message": "I have a question about...",
      "form.terms": "Acepto los términos y condiciones",
      "form.sending": "Enviando...",
      "form.send": "Enviar",
    };
    return translations[key] || key;
  };
  return (
    <div className="w-full mt-7 mb-7 lg:mt-0 lg:mb-0 lg:w-1/3 z-50 max-w-[30rem]">
      <h2 className={`italic text-2xl font-bold ${className}  mb-4`}>
        Envíanos tus preguntas <br /> y comentarios.
      </h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-2 flex flex-col items-start w-full  ${className}`}
      >
        <label className="text-sm ">Nombre</label>
        <input
          {...register("username")}
          placeholder={t("form.username")}
          className="w-2/3  placeholder:text-xs placeholder:pl-1 pl-1 py-1"
        />
        {errors.username && (
          <p className="text-sm text-red-900">{errors.username.message}</p>
        )}
        <label className="text-sm ">Email</label>

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
        <label className="text-sm ">Mensaje</label>

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
          {isSubmitting ? t("form.sending") : t("form.send")}
        </button>
      </form>
    </div>
  );
}
