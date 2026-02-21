import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { getAllOrders } from "../services/admin.api";

const RecentActivityTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 2. Initialize navigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        // Updated to handle Laravel's paginated response format
        setOrders(response.data || response.orders || []);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'delivered':
        return { label: 'Completed', classes: 'bg-green-100 text-green-600' };
      case 'pending':
        return { label: 'Pending', classes: 'bg-orange-100 text-orange-600' };
      default: // picked_up aw accepted
        return { label: 'In Progress', classes: 'bg-blue-100 text-blue-600' };
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400 animate-pulse font-bold italic">Loading Activity Log...</div>;

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header with View All Button */}
      <div className="p-7 border-b border-gray-50 bg-white flex justify-between items-center">
        <h3 className="font-black text-gray-800 text-lg uppercase tracking-tighter">Recent Orders</h3>

        <button
          onClick={() => navigate('/admin/all-orders')} // Navigate to detailed OrdersPage
          className="text-orange-500 text-xs font-black uppercase tracking-widest hover:bg-orange-50 px-4 py-2 rounded-xl transition-all border border-orange-100 shadow-sm"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30">
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Number</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Time</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Users</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Actions</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Details</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.slice(0, 10).map((order: any) => { // M-nekhid bas ekher 10 kirmel ma ytouwal el dashboard
              const statusData = getStatusConfig(order.status);
              return (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <span className="font-black text-gray-800 text-sm">#{order.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-gray-400 font-bold italic">
                      {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-bold text-gray-700 text-sm">
                    {order.company?.name || 'Guest'}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-tighter">
                      Order {order.status === 'delivered' ? 'Delivered' : 'Placed'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-gray-400 font-medium italic truncate block max-w-[180px]">
                      #{order.id} to {order.delivery_address.split(',')[0]}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] ${statusData.classes}`}>
                      {statusData.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityTable;