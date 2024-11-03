import { apiClient } from "./constants";


export const getAllCredentials = async () => {
    const response = await apiClient.get("/logs/credentials");
    return response.data;
  };


  export const getAllActions = async () => {
    const response = await apiClient.get("/logs/commands");
    return response.data;
  };



  export const getAllSessions = async () => {
    const response = await apiClient.get("/logs/sessions");
    return response.data;
  };


  export const getAllFingerprints = async () => {
    const response = await apiClient.get("/logs/fingerprints");
    return response.data;
  };