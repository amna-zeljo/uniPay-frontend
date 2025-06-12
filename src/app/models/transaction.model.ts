export interface Transaction {
  id: string;
  amount: number;
  description?: string;
  transactionDate	: string;
  type: 'INCOMING' | 'OUTGOING';
  senderId?: string;
  recipientId?: string;
}
