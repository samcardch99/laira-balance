import type { EventConfig, TierConfig } from "../../data/events-data/friendsgiving";

export type TierStatus = "available" | "upcoming" | "expired" | "soldOut";

export interface TierAvailability {
  tier: TierConfig;
  status: TierStatus;
}

export function evaluateTier(tier: TierConfig, config: EventConfig, now: Date): TierAvailability {
  const t = now.getTime();
  let status: TierStatus;
  if (t >= new Date(tier.closesAt).getTime()) status = "expired";
  else if (config.soldOut || tier.soldOut) status = "soldOut";
  else if (t < new Date(tier.opensAt).getTime()) status = "upcoming";
  else status = "available";
  return { tier, status };
}

export function evaluateTiers(config: EventConfig, now: Date) {
  return config.tiers.map((tier) => evaluateTier(tier, config, now));
}
