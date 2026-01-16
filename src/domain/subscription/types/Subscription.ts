export interface Subscription {
  isSubscriber: boolean;
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'none';
  currentPeriodEnd?: string;
  essaysUsed: number;
  essaysLimit: number;
  freeEssayUsed: boolean;
}

export interface CheckoutSessionResponse {
  url: string;
}

export interface PortalSessionResponse {
  url: string;
}

export interface SubscriptionLimitResponse {
  canCreateEssay: boolean;
  isSubscriber: boolean;
  essaysUsed: number;
  essaysLimit: number;
  reason?: string;
}
