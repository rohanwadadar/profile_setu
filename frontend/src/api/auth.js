import api from "./axios";

export const loginUser = (data) =>
  api.post("/api/login", data);

export const registerUser = (data) =>
  api.post("/api/register", data);

export const getProfile = () =>
  api.get("/api/profile");