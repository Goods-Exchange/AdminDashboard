import api from "./api";

export const getAllReports = async () => {
  const response = await api.get(`/api/v1/VerifyReport/GetAllReports`);
  return response.data;
};

export const getShopReports = async () => {
  const response = await api.get(`/api/v1/VerifyReport/GetAllReports`);
  return response.data;
};

export const updateReportStatus = async (data) => {
  const response = await api.put(`/api/v1/reports/status`, data);
  return response.data;
};
