// import express from "express";

// import {
//   getAllUsers,
//   getUserById,
//   getUserByEmail,
//   createUser,
//   updateUser,
//   deleteUser,
//   getAdminByEmail,
// } from "../controllers/userController.js";

// const router = express.Router();

// router.get("/", getUserByEmail);

// router.get("/all", getAllUsers);

// router.get("/admins", getAdminByEmail);

// router.post("/", createUser);

// router.get("/:id", getUserById);

// router.put("/:id", updateUser);

// router.delete("/:id", deleteUser);

// export default router;

import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
