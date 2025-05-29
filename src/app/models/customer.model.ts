export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  subscriptionPoints: number;
  qrCodeUrl?: string;
}