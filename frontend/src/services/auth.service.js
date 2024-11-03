import { apiClient } from "./constants";

export const checkUserLoginStatus = async ({ sid }) => {
  const response = await apiClient.get(
    "/auth/status",
    sid && {
      headers: {
        Cookie: `access_token_cookie=${sid}`,
      },
    }
  );

  return response.data;
};


export const userLogin = async ({ username, password }) => {
  const response = await apiClient.post("/auth/login", { username, password });
  return response.data;
};


export const userSignup = async ({ username, password, email }) => {
  const response = await apiClient.post("/auth/signup", { username, password, email });
  return response.data;
};

export const userLogout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};