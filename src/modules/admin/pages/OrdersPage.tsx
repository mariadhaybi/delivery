import { useEffect, useState } from "react";
import { getAllOrders } from "../services/admin.api";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await getAllOrders();
                // El API bi-rajje3 14 orders, m-nfarjihon kelhon metel el soura
                setOrders(response.orders || []);
            } catch (err) {
                console.error("Error fetching orders", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Helper kirmel el Status ykoun Orange metel el design
    const formatStatus = (status: string) => {
        if (status === 'delivered') return 'Completed';
        if (status === 'pending') return 'Pending';
        return 'In progress';
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );

    return (
        <div className="p-10 bg-[#fdfdfd] min-h-screen">
            {/* Page Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-10 ml-2">Recently Activity</h2>

            {/* Table Container */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <table className="w-full text-center border-collapse">
                    <thead>
                        {/* El Header color (#f2e9e4) metel el soura bel dabet */}
                        <tr className="bg-[#f2e9e4] text-gray-700">
                            <th className="py-5 font-bold text-sm">Number</th>
                            <th className="py-5 font-bold text-sm">Time</th>
                            <th className="py-5 font-bold text-sm">Users</th>
                            <th className="py-5 font-bold text-sm">Actions</th>
                            <th className="py-5 font-bold text-sm">Details</th>
                            <th className="py-5 font-bold text-sm">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order: any, index: number) => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                {/* Number (01, 02...) */}
                                <td className="py-5 text-xs text-gray-500 font-medium">
                                    {String(index + 1).padStart(2, '0')}
                                </td>

                                {/* Time */}
                                <td className="py-5 text-xs text-gray-500 font-medium">
                                    {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </td>

                                {/* Users (Driver Name mapping) */}
                                <td className="py-5 text-xs text-gray-500 font-medium">
                                    {order.driver_name || `Driver ${order.id + 100}`}
                                </td>

                                {/* Actions */}
                                <td className="py-5 text-xs text-gray-500 font-medium">Order Delivered</td>

                                {/* Details (#ID to Street) */}
                                <td className="py-5 text-xs text-gray-500 font-medium italic">
                                    #{order.id} to {order.delivery_address?.split(',')[0]}
                                </td>

                                {/* Status - All Orange Style */}
                                <td className="py-5">
                                    <div className="flex justify-center">
                                        <span className="bg-[#e67e22] text-white text-[10px] py-1.5 px-5 rounded-full font-bold min-w-[100px] shadow-sm uppercase tracking-wider">
                                            {formatStatus(order.status)}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* --- PAGINATION SECTION --- */}
                <div className="p-8 flex justify-end items-center gap-3 bg-white border-t border-gray-50">
                    {/* Previous Button */}
                    <button
                        className="px-5 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:bg-gray-50 transition"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    {[1, 2, 3].map((num) => (
                        <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${currentPage === num
                                ? "bg-[#e67e22] text-white shadow-lg shadow-orange-200"
                                : "text-gray-400 hover:bg-gray-50"
                                }`}
                        >
                            {num}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        className="px-5 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
