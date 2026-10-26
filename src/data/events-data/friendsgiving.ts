// Configuración del evento Laira Friendsgiving.
// Todas las fechas van con desfase explícito de Miami (America/New_York):
// -04:00 hasta el 1 de noviembre de 2026 (EDT) y -05:00 desde entonces (EST).
//
// La venta ocurre entera en Mindbody: cada boleto es una opción de precio que paga
// la inscripción del evento, y la web solo enlaza a ella. La web no puede leer las
// ventas de Mindbody sin un backend, así que los cupos los controla Mindbody
// (aforo de 30 en la inscripción) y "agotado" se marca aquí a mano con `soldOut`.

export type TierId = "member" | "earlyBird" | "general";

export interface TierConfig {
  id: TierId;
  /** Precio por unidad en USD, impuestos no incluidos. */
  price: number;
  opensAt: string;
  closesAt: string;
  /** Marcar a mano cuando el boleto se agote en Mindbody. */
  soldOut: boolean;
  /** Enlace directo de compra de la opción de precio en Mindbody. Vacío = botón desactivado. */
  mindbodyUrl: string;
}

export interface EventConfig {
  name: string;
  capacity: number;
  timeZone: string;
  /** Marcar a mano cuando se llegue a los 30 cupos: desactiva todos los boletos. */
  soldOut: boolean;
  tiers: TierConfig[];
}

// Evento: sábado 28 de noviembre de 2026, 11:00–13:00 (clase en Mindbody).
// La venta abre el 26 de octubre y cierra al terminar el 25 de noviembre.
const PUBLIC_SALE_OPENS = "2026-10-26T00:00:00-04:00";
const SALES_CLOSE = "2026-11-26T00:00:00-05:00";

// Early Bird vive hasta el final del 8 de noviembre; General entra justo después.
const EARLY_BIRD_ENDS = "2026-11-09T00:00:00-05:00";

const HOURS_48 = 48 * 60 * 60 * 1000;
const MEMBER_OPENS = new Date(
  new Date(PUBLIC_SALE_OPENS).getTime() - HOURS_48
).toISOString();

export const friendsgiving: EventConfig = {
  name: "Laira Friendsgiving",
  capacity: 30,
  timeZone: "America/New_York",
  soldOut: false,
  tiers: [
    {
      // Tope de 12 y "solo miembros" se configuran en la opción de precio de Mindbody.
      id: "member",
      price: 45,
      opensAt: MEMBER_OPENS,
      closesAt: SALES_CLOSE,
      soldOut: false,
      mindbodyUrl: "https://go.mindbodyonline.com/book/app/pricing/bus_11kWNMBxFA2HUjjrgd/po_11kWNMBxFA2HUEndFy",
    },
    {
      // Tope de 10: quitar la venta online en Mindbody al llegar a 10.
      id: "earlyBird",
      price: 59,
      opensAt: PUBLIC_SALE_OPENS,
      closesAt: EARLY_BIRD_ENDS,
      soldOut: false,
      mindbodyUrl: "https://go.mindbodyonline.com/book/app/pricing/bus_11kWNMBxFA2HUjjrgd/po_11kWNMBxFA2HUEndDw",
    },
    {
      id: "general",
      price: 69,
      opensAt: EARLY_BIRD_ENDS,
      closesAt: SALES_CLOSE,
      soldOut: false,
      mindbodyUrl: "https://go.mindbodyonline.com/book/app/pricing/bus_11kWNMBxFA2HUjjrgd/po_11kWNMBxFA2HUEndBu",
    },
  ],
};
