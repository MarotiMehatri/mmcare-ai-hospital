import fs from "fs/promises";
import path from "path";

const DB_FILE = path.join(process.cwd(), "db.json");

const readDB = async () => {
  const data = await fs.readFile(DB_FILE, "utf-8");
  return JSON.parse(data);
};

const writeDB = async (db) => {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
};

export const getAllUsers = async (req, res) => {
  try {
    const db = await readDB();
    const email = req.query.email?.trim().toLowerCase();

    let users = db.users || [];

    if (email) {
      users = users.filter(
        (user) => user.email?.trim().toLowerCase() === email
      );
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const db = await readDB();

    const user = (db.users || []).find(
      (u) => String(u.id) === String(req.params.id)
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const db = await readDB();
    const users = db.users || [];

    const newUser = {
      ...req.body,
      id: req.body.id || Date.now(),
      email: req.body.email?.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    db.users = users;

    await writeDB(db);

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const db = await readDB();
    const users = db.users || [];

    const index = users.findIndex(
      (u) => String(u.id) === String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    users[index] = {
      ...users[index],
      ...req.body,
      email: req.body.email
        ? req.body.email.trim().toLowerCase()
        : users[index].email,
      updatedAt: new Date().toISOString(),
    };

    db.users = users;

    await writeDB(db);

    res.status(200).json({
      success: true,
      data: users[index],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const db = await readDB();
    const users = db.users || [];

    const filteredUsers = users.filter(
      (u) => String(u.id) !== String(req.params.id)
    );

    if (filteredUsers.length === users.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    db.users = filteredUsers;

    await writeDB(db);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};