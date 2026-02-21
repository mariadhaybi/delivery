export interface AdminStats {
  total_orders: number;
  delivered_orders: number;
  pending_drivers: number;
  chartData?: { day: string; orders: number }[];
}

export interface Order {
  id: number;
  driver: string;
  time: string;
  status: "Pending" | "Completed" | "In progress";
}

export interface OrderStatusCounts {
  pending: number;
  accepted: number;
  picked_up: number;
  delivered: number;
}
