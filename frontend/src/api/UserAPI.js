import api from "./axios";

/* ==========================
          USER API
========================== */

const getArrayData = (res) => {
  const data = res?.data?.data || res?.data || [];
  return Array.isArray(data) ? data : [];
};

const getObjectData = (res) => {
  return res?.data?.data || res?.data || null;
};

// GET ALL USERS
export const getUsers = async () => {
  const res = await api.get("/users");
  return getArrayData(res);
};

// GET USER BY ID
export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return getObjectData(res);
};

// GET USER BY EMAIL
export const getUserByEmail = async (email) => {
  const res = await api.get("/users", {
    params: { email },
  });

  return getArrayData(res);
};

// CREATE USER
export const createUser = async (user) => {
  const res = await api.post("/users", user);
  return getObjectData(res);
};

// UPDATE USER
export const updateUser = async (id, user) => {
  const res = await api.put(`/users/${id}`, user);
  return getObjectData(res);
};

// DELETE USER
export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
