import { apiClient } from "./constants";


export const getLoginAttempts = async () => {
    const response = await apiClient.get("/stats/login-attempts");
    return response.data;
  };


  export const getGeoData = async () => {
    const response = await apiClient.get("/stats/geographical-attack-map");
    return response.data;
  };


  export const getTopCreds = async () => {
    const response = await apiClient.get("/stats/top-credentials");
    return response.data;
  };

  export const getRecentSessions = async () => {
    const response = await apiClient.get("/stats/recent-sessions");
    return response.data;
  };


  export const getCommonCommands = async () => {
    const response = await apiClient.get("/stats/command-frequency");
    return response.data;
  };

