import { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// === MOCK DATA ===
interface Driver {
  id: number;
  name: string;
  vehicle_type: string;
  license_number: string;
  documents_url: string;
  is_verified: boolean;
}

interface RevenueData {
  date: string;
  revenue: number;
}

const mockDriverLocations = [
  { id: 1, name: "Driver A", lat: 33.5138, lng: 36.2765 },
  { id: 2, name: "Driver B", lat: 33.5200, lng: 36.2800 },
];

const mockDrivers: Driver[] = [
  { id: 1, name: "Driver A", vehicle_type: "Car", license_number: "ABC123", documents_url: "#", is_verified: false },
  { id: 2, name: "Driver B", vehicle_type: "Bike", license_number: "XYZ456", documents_url: "#", is_verified: false },
];

const mockRevenue: RevenueData[] = [
  { date: "2026-01-14", revenue: 120 },
  { date: "2026-01-15", revenue: 95 },
  { date: "2026-01-16", revenue: 140 },
  { date: "2026-01-17", revenue: 180 },
];

const AdminDashboard = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [revenue] = useState<RevenueData[]>(mockRevenue);

  // === Approve / Reject ===
  const handleApprove = (id: number) => {
    setDrivers(prev =>
      prev.map(d => (d.id === id ? { ...d, is_verified: true } : d))
    );
  };

  const handleReject = (id: number) => {
    setDrivers(prev => prev.filter(d => d.id !== id));
  };

  // === Chart.js data ===
  const chartData = useMemo(() => ({
    labels: revenue.map(r => r.date),
    datasets: [
      {
        label: "Revenue",
        data: revenue.map(r => r.revenue),
        backgroundColor: "rgba(34,197,94,0.7)",
      },
    ],
  }), [revenue]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Revenue Over Time" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="p-6 space-y-10">
      {/* Driver Approval Table */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Driver Approval</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Vehicle</th>
                <th className="p-2 border">License</th>
                <th className="p-2 border">Documents</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No drivers pending approval
                  </td>
                </tr>
              ) : (
                drivers.map(driver => (
                  <tr key={driver.id} className="text-center">
                    <td className="p-2 border">{driver.name}</td>
                    <td className="p-2 border">{driver.vehicle_type}</td>
                    <td className="p-2 border">{driver.license_number}</td>
                    <td className="p-2 border">
                      <a href={driver.documents_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        View Docs
                      </a>
                    </td>
                    <td className="p-2 border">
                      {driver.is_verified ? (
                        <span className="text-green-600 font-semibold">Approved</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">Pending</span>
                      )}
                    </td>
                    <td className="p-2 border space-x-2">
                      {!driver.is_verified && (
                        <>
                          <button
                            onClick={() => handleApprove(driver.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(driver.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Chart */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Revenue Chart</h2>
        <div className="w-full max-w-3xl">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Drivers Map */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Drivers Locations</h2>
        <div className="h-[400px] w-full rounded-lg overflow-hidden border">
          <MapContainer center={L.latLng(33.5138, 36.2765)} zoom={13} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {mockDriverLocations.map(driver => (
              <Marker key={driver.id} position={[driver.lat, driver.lng]}>
                <Popup>{driver.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
