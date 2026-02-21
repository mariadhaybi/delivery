import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import OrdersChart from "../components/OrdersChart";
import OrdersDonut from "../components/OrdersDonut";
import RecentActivityTable from "../components/DriversTable";
import { getAdminStats } from "../services/admin.api";

// 1. Zid el interface hon kirmel online_drivers w total_companies
interface Stats {
  total_orders: number;
  delivered_orders: number;
  pending_orders: number;
  online_drivers: number;
  total_companies: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [chartData, setChartData] = useState<{ day: string; orders: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAdminStats();
        // Updated mapping for the new backend structure
        if (response && response.cards) {
          const cards = response.cards;
          setStats({
            total_orders: cards.pending_orders + cards.active_deliveries || 0,
            delivered_orders: cards.active_deliveries || 0,
            pending_orders: cards.pending_orders || 0,
            online_drivers: cards.online_drivers || 0,
            total_companies: cards.total_companies || response.companies || 0,
          });
        }

        // Transform orders_chart data if available
        if (response && response.orders_chart) {
          const transformedData = response.orders_chart.labels.map((label: string, index: number) => ({
            day: label,
            orders: response.orders_chart.data[index] || 0
          }));
          setChartData(transformedData);
        }
      } catch (error) {
        console.error("Stats error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-orange-500 font-bold animate-pulse text-xl">
          Loading System Data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans">
      {/* Header section */}
      <header className="mb-10">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
          Welcome to the Delivery Management System
        </h1>
        <p className="text-gray-400 mt-1 font-medium italic">
          Smart control.. Fast Deliveries
        </p>
      </header>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <StatCard
          title="Total Orders"
          value={stats?.total_orders || 0}
          subtitle="this week"
          color="orange"
          trend="+10%"
          icon={<span className="text-2xl">💰</span>}
        />

        <StatCard
          title="Active Deliveries"
          value={stats?.delivered_orders || 0}
          // Dynamic Subtitle: Halla2 b-farje "Online: 2" badal "600"
          subtitle={`Online Drivers: ${stats?.online_drivers || 0}`}
          color="red"
          icon={<span className="text-2xl">👤</span>}
        />

        <StatCard
          title="Pending Orders"
          value={stats?.pending_orders || 0}
          // Dynamic Subtitle: Halla2 b-farje "Companies: 12"
          subtitle={`Total Companies: ${stats?.total_companies || 0}`}
          color="brown"
          icon={<span className="text-2xl">📋</span>}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10 items-stretch">
        <div className="lg:col-span-3 min-w-0">
          <OrdersChart data={chartData} />
        </div>
        <div className="lg:col-span-1 min-w-0">
          <OrdersDonut
            totalOrders={stats?.total_orders}
            companiesCount={stats?.total_companies}
          />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="w-full">
        <RecentActivityTable />
      </div>
    </div>
  );
};

export default Dashboard;