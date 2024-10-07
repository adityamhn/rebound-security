import { apiClient } from "./constants";

export const checkUserLoginStatus = async ({ sid }) => {
  const response = await apiClient.get(
    "/auth/status",
    sid && {
      headers: {
        Cookie: `sid=${sid}`,
      },
    }
  );

  return response.data;
};


export const userLogin = async ({ username, password }) => {
  const response = await apiClient.post("/auth/login", { username, password });
  return response.data;
};


export const userSignup = async ({ username, password }) => {
  const response = await apiClient.post("/auth/signup", { username, password });
  return response.data;
};