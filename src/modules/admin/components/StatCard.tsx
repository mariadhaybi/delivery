import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: ReactNode;
  color: "orange" | "red" | "brown";
  trend?: string;
}

const StatCard = ({ title, value, subtitle, icon, color, trend }: Props) => {
  // Styles based on the design colors and API context
  const styles = {
    orange: "border-b-[#f97316] text-[#f97316]",
    red: "border-b-[#7f1d1d] text-[#7f1d1d]",
    brown: "border-b-[#78350f] text-[#78350f]",
  };

  return (
    <div className={`relative bg-white rounded-[2.5rem] p-6 shadow-sm border-t border-x border-gray-100 border-b-4 ${styles[color]}`}>

      {/* Top Section: Icon and Trend Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-2xl bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-gray-50">
          {icon}
        </div>
        {trend && (
          <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full border border-gray-200">
            {trend}
          </span>
        )}
      </div>

      {/* Main Content: Title and API Value */}
      <div className="flex flex-col">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          {title}
        </p>
        <h2 className="text-2xl font-black text-gray-800 mt-1 tracking-tight">
          {typeof value === "number" ? value.toLocaleString() : value}
        </h2>
      </div>

      {/* Footer: Subtitle and Decorative Wave */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-[11px] text-gray-400 font-medium italic">
          {subtitle}
        </p>

        {/* SVG Wave exactly as seen in the design */}
        <svg className="w-12 h-4 opacity-20" viewBox="0 0 120 28" fill="currentColor">
          <path d="M0 25.88c3.75 0 7.5-2.25 11.25-4.5s7.5-4.5 11.25-4.5 7.5 2.25 11.25 4.5 7.5 4.5 11.25 4.5 7.5-2.25 11.25-4.5 7.5-4.5 11.25-4.5 7.5 2.25 11.25 4.5 7.5 4.5 11.25 4.5v2.25H0z" />
        </svg>
      </div>
    </div>
  );
};

export default StatCard;
