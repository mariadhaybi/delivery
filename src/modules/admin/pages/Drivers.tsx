import { useEffect, useState } from "react";
import {
  getPendingDrivers,
  approveDriver,
  rejectDriver,
} from "../services/admin.api";

interface Driver {
  id: number;
  name: string;
  // Add other driver properties here as needed
}

const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const fetchDrivers = async () => {
    try {
      const response = await getPendingDrivers();
      if (response && Array.isArray(response.drivers)) {
        setDrivers(response.drivers);
      } else {
        console.error("Drivers API invalid format:", response);
        setDrivers([]);
      }
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await approveDriver(id);
      fetchDrivers();
    } catch (error) {
      console.error("Failed to approve driver:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectDriver(id);
      fetchDrivers();
    } catch (error) {
      console.error("Failed to reject driver:", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Pending Drivers
      </h1>

      {drivers.map((driver) => (
        <div
          key={driver.id}
          className="flex justify-between bg-white p-4 mb-2 shadow rounded"
        >
          <span>{driver.name}</span>

          <div className="space-x-2">
            <button
              onClick={() => handleApprove(driver.id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => handleReject(driver.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Drivers;
