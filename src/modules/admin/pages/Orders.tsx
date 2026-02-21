import { useEffect, useState } from "react";
import { getAllOrders } from "../services/admin.api";

interface Order {
  id: number;
  status: string;
  customer_name: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        console.log("Orders API full response:", response);

        // Laravel paginated responses put data in the 'data' key
        if (response && Array.isArray(response.data)) {
          setOrders(response.data);
        } else if (response && Array.isArray(response.orders)) {
          setOrders(response.orders);
        } else {
          console.error("Orders API invalid format:", response);
          setOrders([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Orders</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Reference</th>
            <th className="p-3 text-left">Customer (Company)</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-semibold text-orange-600">#{order.id}</td>
              <td className="p-3 text-gray-600">{order.order_reference || "N/A"}</td>
              <td className="p-3">{order.company?.name || "Unknown"}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                  }`}>
                  {order.status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
