import {
  getProfileById,
  createProfile,
  updateProfile,
} from "../../api/UserAPI";

export const fetchProfile = async (id) => {
  try {
    const res = await getProfileById(id);
    return res.data;
  } catch (error) {
    console.error("Fetch profile error:", error);
    throw error;
  }
};

export const saveProfile = async (profile) => {
  try {
    if (profile.id) {
      const res = await updateProfile(profile.id, profile);
      return res.data;
    } else {
      const res = await createProfile(profile);
      return res.data;
    }
  } catch (error) {
    console.error("Save profile error:", error);
    throw error;
  }
};
