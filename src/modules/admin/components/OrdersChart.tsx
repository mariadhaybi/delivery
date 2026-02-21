import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";


interface Props {
  data?: { day: string; orders: number }[];
}

const OrdersChart = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm p-6 border border-gray-50 h-[350px]">
      <h3 className="font-bold text-lg mb-6 text-gray-700">
        Orders Volume (Last 30 Days)
      </h3>

      <div className="w-full h-[85%]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data && data.length > 0 ? data : []}>
            <defs>
              {/* El Gradient li bel soura: mn orange la transparent */}
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid lines horizontal bas (metel el design) */}
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />

            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />

            <Area
              type="monotone"
              dataKey="orders"
              stroke="#f97316"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOrders)"
              // El dots (no2at) el rammadiye/orange li bel soura
              dot={{ r: 4, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersChart;