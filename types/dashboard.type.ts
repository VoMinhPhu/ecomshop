import { OrderStatus, PaymentMethod } from './order.type';

//Card
type MetricCompare = {
  current: number;
  previous: number;
  growthRate: number | null;
};

export type DashboardOverviewResponse = {
  overviewOrder: {
    revenue: MetricCompare;
    orders: MetricCompare;
    averageOrderValue: MetricCompare;
  };
  userOverview: {
    newUsers: number;
    previousMonthNewUsers: number;
    growthRate: number | null;
  };
};

//Chart
export interface RevenueByDay {
  date: string; // ISO string (UTC)
  revenue: number;
}

export interface RevenueByMonth {
  month: string; // ISO string (UTC, end of month)
  revenue: number;
}

export interface RevenueChartResponse {
  last7Days: RevenueByDay[];
  last30Days: RevenueByDay[];
  last3Months: RevenueByMonth[];
}

//Order
export type RecentOrder = {
  id: string;
  orderCode: string;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  createdAt: string; // ISO string
  itemsCount: number;
  products: {
    id: string;
    name: string;
    thumbnail: string;
    quantity: number;
  }[];
};

export type RecentOrdersResponse = RecentOrder[];
