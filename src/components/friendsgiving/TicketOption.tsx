import type { TierAvailability } from "./inventory";
import type { Copy } from "./copy";

interface Props {
  availability: TierAvailability;
  selected: boolean;
  onSelect: () => void;
  t: Copy;
  formatDate: (iso: string) => string;
}

export default function TicketOption({ availability, selected, onSelect, t, formatDate }: Props) {
  const { tier, status } = availability;
  const disabled = status !== "available";
  const text = t.tiers[tier.id];

  let badge: string | null = null;
  if (status === "upcoming") badge = t.status.upcoming(formatDate(tier.opensAt));
  else if (status === "expired") badge = t.status.expired;
  else if (status === "soldOut") badge = t.status.soldOut;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onSelect}
      className={[
        "group relative w-full overflow-hidden rounded-3xl p-6 text-left text-primary",
        "border bg-white/25 backdrop-blur-xl shadow-[0_8px_32px_rgba(141,110,94,0.18)]",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkPink",
        selected
          ? "border-darkPink/70 ring-1 ring-darkPink/60 -translate-y-1"
          : "border-white/60",
        disabled
          ? "cursor-not-allowed opacity-50 grayscale-[60%]"
          : "cursor-pointer hover:-translate-y-1 hover:bg-white/35",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/10 to-pinkCustom/25"
      />
      <span className="relative flex flex-col gap-3">
        {badge && (
          <span className="self-start rounded-full bg-primary/10 px-3 py-1 text-xs">{badge}</span>
        )}
        <span className="text-2xl font-bold italic">{text.name}</span>
        <span className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${status === "expired" || status === "soldOut" ? "line-through decoration-1" : disabled ? "" : "text-darkPink"}`}>
            ${tier.price}
          </span>
          <span className="text-sm">{t.perPerson}</span>
        </span>
        <span className="text-sm leading-snug">{text.note}</span>
      </span>
    </button>
  );
}
