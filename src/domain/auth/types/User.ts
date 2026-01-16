export interface User {
  userId: string;
  email: string;
  name: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'none';
  currentPeriodEnd?: string;
  essaysUsedThisMonth?: number;
  essaysResetDate?: string;
  freeEssayUsed?: boolean;
}
