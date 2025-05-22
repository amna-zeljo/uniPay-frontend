export interface Transaction {
  id: string;
  amount: number;
  description?: string;
  timestamp: string;
  type: 'INCOMING' | 'OUTGOING';
  senderId?: string;
  recipientId?: string;
}