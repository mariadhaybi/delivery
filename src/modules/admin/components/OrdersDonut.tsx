import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  totalOrders?: number;
  companiesCount?: number;
}

// 1. Custom Tooltip Component: Hayda el popup li byitla3
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-xl rounded-lg border border-gray-100 flex flex-col items-center">
        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
          {payload[0].name}
        </span>
        <span className="text-lg font-black text-gray-800">
          {payload[0].value}
        </span>
        <span className="text-[10px] text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-full mt-1">
          {payload[0].payload.percent}% of total
        </span>
      </div>
    );
  }
  return null;
};

const OrdersDonut = ({ totalOrders = 0, companiesCount = 0 }: Props) => {
  const totalActivity = totalOrders + companiesCount;

  // 2. Data ma3 calculation lal percentage jowweta kermel el tooltip yshoufa
  const data = [
    {
      name: "Orders",
      value: totalOrders,
      percent: totalActivity > 0 ? Math.round((totalOrders / totalActivity) * 100) : 0
    },
    {
      name: "Companies",
      value: companiesCount,
      percent: totalActivity > 0 ? Math.round((companiesCount / totalActivity) * 100) : 0
    },
  ];

  const COLORS = ["#fb923c", "#ea580c"];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm p-6 border border-gray-50 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <span className="text-gray-400 text-sm italic font-medium">Activity Type</span>
        <div className="flex gap-4">
          {/* Legend Items */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#fb923c]"></span>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Orders</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Companies</span>
          </div>
        </div>
      </div>

      <div className="relative flex-grow flex items-center justify-center">
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* 3. El Tooltip logic */}
              <Tooltip content={<CustomTooltip />} />

              <Pie
                data={data}
                innerRadius={75}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                stroke="none"
                cursor="pointer"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 pointer-events-none">
          <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-tighter">Total Growth</span>
          <span className="text-4xl font-black text-gray-800 tracking-tighter">
            {totalActivity}
          </span>
        </div>
      </div>

      <div className="mt-4 self-start bg-white shadow-lg border border-gray-50 rounded-xl px-4 py-2 flex items-center gap-2 transform -translate-y-2">
        <div className="w-2 h-2 rounded-full bg-[#fb923c]"></div>
        <span className="text-[11px] font-bold text-gray-600">
          Interact to see details
        </span>
      </div>
    </div>
  );
};

export default OrdersDonut;