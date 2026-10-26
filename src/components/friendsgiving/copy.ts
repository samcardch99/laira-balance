import type { TierId } from "../../data/events-data/friendsgiving";

export type Lang = "es" | "en";

export const copy = {
  es: {
    heading: "Elige tu entrada",
    capacity: (n: number) => `Solo ${n} cupos`,
    tiers: {
      member: { name: "Laira Member", note: "Precio exclusivo para miembros con membresía activa." },
      earlyBird: { name: "Early Bird", note: "Precio de lanzamiento hasta el 8 de noviembre." },
      general: { name: "General", note: "Disponible desde el 9 de noviembre." },
    } satisfies Record<TierId, { name: string; note: string }>,
    status: {
      upcoming: (date: string) => `Abre el ${date}`,
      expired: "Finalizado",
      soldOut: "Agotado",
    },
    perPerson: "por persona",
    taxes: "Impuestos no incluidos",
    select: "Selecciona una entrada",
    checkout: "Comprar en Mindbody",
    linkPending: "Venta aún no disponible",
    payOnMindbody: "El pago se completa en Mindbody.",
    memberHint: "Inicia sesión en Mindbody con tu cuenta de miembro para ver este precio.",
  },
  en: {
    heading: "Choose your ticket",
    capacity: (n: number) => `Only ${n} spots`,
    tiers: {
      member: { name: "Laira Member", note: "Exclusive price for members with an active membership." },
      earlyBird: { name: "Early Bird", note: "Launch price through November 8." },
      general: { name: "General", note: "Available from November 9." },
    } satisfies Record<TierId, { name: string; note: string }>,
    status: {
      upcoming: (date: string) => `Opens ${date}`,
      expired: "Ended",
      soldOut: "Sold out",
    },
    perPerson: "per person",
    taxes: "Taxes not included",
    select: "Select a ticket",
    checkout: "Buy on Mindbody",
    linkPending: "Sales not open yet",
    payOnMindbody: "Payment is completed on Mindbody.",
    memberHint: "Sign in to Mindbody with your member account to see this price.",
  },
};

export type Copy = (typeof copy)[Lang];
