import User from "../../models/User.model.js";

/* =====================================================
   GET ALL USERS
   GET /api/users
   GET /api/users?email=example@gmail.com
   GET /api/users?role=patient
===================================================== */

export const getAllUsers = async (req, res, next) => {
  try {
    const { email, role, status } = req.query;

    const filter = {};

    /* -----------------------------------------------
       EMAIL FILTER
    ------------------------------------------------ */

    if (email) {
      filter.email = email.trim().toLowerCase();
    }

    /* -----------------------------------------------
       ROLE FILTER
    ------------------------------------------------ */

    if (role) {
      filter.role = role.trim().toLowerCase();
    }

    /* -----------------------------------------------
       STATUS FILTER
    ------------------------------------------------ */

    if (status) {
      filter.status = status.trim();
    }

    const users = await User.find(filter)
      .select("+password")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};


/* =====================================================
   GET USER BY ID
   GET /api/users/:id
===================================================== */

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let user = null;

    /* -----------------------------------------------
       FIRST: MongoDB _id
    ------------------------------------------------ */

    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      user = await User.findById(id)
        .select("-password")
        .lean();
    }

    /* -----------------------------------------------
       SECOND: legacyId
    ------------------------------------------------ */

    if (!user) {
      user = await User.findOne({
        $or: [
          { legacyId: String(id) },
          { id: String(id) },
          { userId: String(id) },
        ],
      })
        .select("-password")
        .lean();
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


/* =====================================================
   CREATE USER
   POST /api/users
===================================================== */

export const createUser = async (req, res, next) => {
  try {
    const {
      email,
      role,
      ...userData
    } = req.body;

    /* -----------------------------------------------
       VALIDATION
    ------------------------------------------------ */

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    /* -----------------------------------------------
       CHECK DUPLICATE EMAIL
    ------------------------------------------------ */

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    /* -----------------------------------------------
       CREATE USER
    ------------------------------------------------ */

    const user = await User.create({
      ...userData,
      email: normalizedEmail,
      role: role
        ? String(role).trim().toLowerCase()
        : "patient",
    });

    /* -----------------------------------------------
       REMOVE PASSWORD FROM RESPONSE
    ------------------------------------------------ */

    const safeUser = user.toObject();

    delete safeUser.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};


/* =====================================================
   UPDATE USER
   PUT /api/users/:id
===================================================== */

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    /* -----------------------------------------------
       NORMALIZE EMAIL
    ------------------------------------------------ */

    if (updateData.email) {
      updateData.email =
        updateData.email
          .trim()
          .toLowerCase();
    }

    /* -----------------------------------------------
       NEVER UPDATE _id
    ------------------------------------------------ */

    delete updateData._id;

    /* -----------------------------------------------
       FIND USER
    ------------------------------------------------ */

    let user = null;

    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      user = await User.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        },
      )
        .select("-password")
        .lean();
    }

    /* -----------------------------------------------
       FALLBACK TO LEGACY ID
    ------------------------------------------------ */

    if (!user) {
      user = await User.findOneAndUpdate(
        {
          $or: [
            { legacyId: String(id) },
            { id: String(id) },
            { userId: String(id) },
          ],
        },
        updateData,
        {
          new: true,
          runValidators: true,
        },
      )
        .select("-password")
        .lean();
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


/* =====================================================
   DELETE USER
   DELETE /api/users/:id
===================================================== */

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    let deletedUser = null;

    /* -----------------------------------------------
       DELETE BY MONGODB _id
    ------------------------------------------------ */

    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      deletedUser =
        await User.findByIdAndDelete(id);
    }

    /* -----------------------------------------------
       DELETE BY LEGACY ID
    ------------------------------------------------ */

    if (!deletedUser) {
      deletedUser =
        await User.findOneAndDelete({
          $or: [
            { legacyId: String(id) },
            { id: String(id) },
            { userId: String(id) },
          ],
        });
    }

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};