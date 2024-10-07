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
