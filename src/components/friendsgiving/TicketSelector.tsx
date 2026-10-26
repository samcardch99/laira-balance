import { useEffect, useMemo, useState } from "react";
import { friendsgiving, type TierId } from "../../data/events-data/friendsgiving";
import { evaluateTiers } from "./inventory";
import { copy, type Lang } from "./copy";
import TicketOption from "./TicketOption";

interface Props {
  lang?: Lang;
}

// Vuelve a evaluar fechas cada 30 s para que Early Bird y General cambien sin recargar.
const TICK_MS = 30_000;

/** En desarrollo, ?now=2026-11-09T10:00:00-05:00 simula otra fecha. */
function readNow(): Date {
  if (import.meta.env.DEV && typeof window !== "undefined") {
    const override = new URLSearchParams(window.location.search).get("now");
    if (override && !Number.isNaN(Date.parse(override))) return new Date(override);
  }
  return new Date();
}

export default function TicketSelector({ lang = "es" }: Props) {
  const t = copy[lang];
  const [now, setNow] = useState(readNow);
  const [selectedId, setSelectedId] = useState<TierId | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(readNow()), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const tiers = useMemo(() => evaluateTiers(friendsgiving, now), [now]);
  const selected = tiers.find((a) => a.tier.id === selectedId) ?? null;

  // Si la opción elegida caduca mientras la página está abierta, se suelta.
  useEffect(() => {
    if (selected && selected.status !== "available") setSelectedId(null);
  }, [selected]);

  // La hora solo se muestra si no es medianoche (p. ej. General abre "el 9 de noviembre").
  const formatDate = (iso: string) => {
    const date = new Date(iso);
    const locale = lang === "es" ? "es-ES" : "en-US";
    const timeZone = friendsgiving.timeZone;
    const midnight =
      new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(date) === "00:00";
    return new Intl.DateTimeFormat(locale, {
      timeZone,
      day: "numeric",
      month: "short",
      ...(midnight ? {} : { hour: "numeric", minute: "2-digit" }),
    }).format(date);
  };

  const canCheckout = !!selected && selected.status === "available" && !!selected.tier.mindbodyUrl;

  // El pago, el aforo y la comprobación de membresía ocurren en Mindbody.
  function handleCheckout() {
    if (!selected || !canCheckout) return;
    window.open(selected.tier.mindbodyUrl, "_blank", "noopener");
  }

  let cta = t.select;
  if (selected) cta = selected.tier.mindbodyUrl ? t.checkout : t.linkPending;

  return (
    <section
      id="friendsgiving_tickets"
      className="relative isolate w-full overflow-hidden rounded-[2rem] px-5 py-10 md:px-10"
    >
      {/* Manchas de color detrás del vidrio para que el blur tenga algo que difuminar */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-[#e8d8d0] to-pinkCustom/60" />
      <div aria-hidden className="absolute -left-20 top-10 -z-10 h-72 w-72 rounded-full bg-pinkCustom/60 blur-3xl" />
      <div aria-hidden className="absolute -right-10 bottom-0 -z-10 h-80 w-80 rounded-full bg-darkPink/40 blur-3xl" />

      <header className="mb-8 flex flex-col gap-2 text-primary md:flex-row md:items-end md:justify-between">
        <h2 className="text-4xl font-bold italic md:text-5xl">{t.heading}</h2>
        <p className="text-sm">
          {t.capacity(friendsgiving.capacity)} · {t.taxes}
        </p>
      </header>

      <div role="radiogroup" aria-label={t.heading} className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {tiers.map((a) => (
          <TicketOption
            key={a.tier.id}
            availability={a}
            selected={a.tier.id === selectedId}
            onSelect={() => setSelectedId(a.tier.id)}
            t={t}
            formatDate={formatDate}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-white/60 bg-white/30 p-6 text-primary shadow-[0_8px_32px_rgba(141,110,94,0.18)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-lg">
            {selected ? (
              <>
                {t.tiers[selected.tier.id].name} · <span className="font-bold">${selected.tier.price}</span>
              </>
            ) : (
              t.select
            )}
          </p>
          <p className="text-sm">
            {selected?.tier.id === "member" ? t.memberHint : t.payOnMindbody}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={!canCheckout}
          className="darkPink whitespace-nowrap rounded-full px-6 py-3 text-base shadow-2xl md:px-8 md:text-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary disabled:hover:text-secondary"
        >
          {cta}
        </button>
      </div>
    </section>
  );
}
