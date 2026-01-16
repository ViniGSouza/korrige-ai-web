import { useAuthUser } from "@/domain/auth/hooks";
import type { Subscription } from "../types";

export function useSubscription(): Subscription {
  const { user } = useAuthUser();

  if (!user) {
    return {
      isSubscriber: false,
      subscriptionStatus: "none",
      essaysUsed: 0,
      essaysLimit: 1,
      freeEssayUsed: false,
    };
  }

  const isSubscriber = user.subscriptionStatus === "active";
  const essaysLimit = isSubscriber ? 20 : 1;
  const essaysUsed = isSubscriber ? (user.essaysUsedThisMonth || 0) : (user.freeEssayUsed ? 1 : 0);

  return {
    isSubscriber,
    subscriptionStatus: user.subscriptionStatus || "none",
    currentPeriodEnd: user.currentPeriodEnd,
    essaysUsed,
    essaysLimit,
    freeEssayUsed: user.freeEssayUsed || false,
  };
}
