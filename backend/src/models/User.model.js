import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    legacyId: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },

    id: {
      type: String,
      index: true,
    },

    userId: {
      type: String,
      index: true,
    },

    name: {
      type: String,
      trim: true,
    },

    FullName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      select: false,
    },

    role: {
      type: String,
      default: "patient",
      index: true,
    },

    phone: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Active",
      index: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "users",
  }
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;