import API from "../api/axios";

export const loginUser = async (email, password) => {
  const response = await API.get(`/users?email=${email}&password=${password}`);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/users", userData);
  return response.data;
};
