import api from "./axios";

const getArrayData = (res) => {
  const data = res?.data?.data || res?.data || [];
  return Array.isArray(data) ? data : [];
};

const getObjectData = (res) => {
  return res?.data?.data || res?.data || null;
};

export const getUsers = async () => {
  const res = await api.get("/users");
  return getArrayData(res);
};

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return getObjectData(res);
};

export const getUserByEmail = async (email) => {
  const res = await api.get("/users", {
    params: {
      email: email.trim().toLowerCase(),
    },
  });

  console.log("getUserByEmail API response:", res.data);

  return getArrayData(res);
};

export const createUser = async (user) => {
  const res = await api.post("/users", user);
  return getObjectData(res);
};

export const updateUser = async (id, user) => {
  const res = await api.put(`/users/${id}`, user);
  return getObjectData(res);
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};