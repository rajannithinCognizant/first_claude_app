// DEMO ONLY — shared domain models for the order list feature

export interface InventoryItem {
  type: string;
  category: string;
  id: string;
  budget: number;
  cpm: number;
  impressions: number;
  status: string;
}

export interface OrderDetail {
  orderId: string;
  accountExecutive: string;
  createdBy: string;
  createdOn: string;
  lastUpdated: string;
  impressions: number;
  cpm: number;
  inventory: InventoryItem[];
}

export type OrderStatus = 'ActiveSchedule' | 'Expired' | 'SuccessToAOS' | 'Submitted';

export interface Order {
  id: number;
  orderName: string;
  advertiser: string;
  agency: string;
  market: string;
  campaignStart: string;
  campaignEnd: string;
  budget: number;
  status: OrderStatus;
}

export interface OwnerOption {
  label: string;
  value: string;
}
