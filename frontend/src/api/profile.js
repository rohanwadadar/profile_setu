import api from "./axios";

// GET logged-in user's profile
export const getProfile = () => {
  return api.get("/api/profile");
};

// UPDATE profile
export const updateProfile = (data) => {
  return api.put("/api/profile", data);
};
