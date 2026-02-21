
import api from "../../../api/axios";

// Admin Stats (Main Dashboard)
export const getAdminStats = async () => {
  const res = await api.get("/api/admin/dashboard");
  return res.data;
};

// All Orders
export const getAllOrders = async () => {
  const res = await api.get("/api/admin/orders");
  return res.data;
};

// Pending Drivers
export const getPendingDrivers = async () => {
  const res = await api.get("/api/admin/drivers/pending");
  return res.data;
};

// Approve Driver
export const approveDriver = async (id: number) => {
  const res = await api.post(`/api/admin/drivers/${id}/approve`);
  return res.data;
};

// Reject Driver
export const rejectDriver = async (id: number) => {
  const res = await api.post(`/api/admin/drivers/${id}/reject`);
  return res.data;
};