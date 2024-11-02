import { apiClient } from "./constants";


export const getAllLogs = async () => {
    const response = await apiClient.get("/logs");
    return response.data;
  };