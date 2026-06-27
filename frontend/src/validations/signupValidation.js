import * as yup from "yup";

export const signupSchema =
  yup.object({
    fullName: yup
      .string()
      .required(
        "Full name is required"
      )
      .min(
        3,
        "Minimum 3 characters"
      ),

    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required"),

    dob: yup
      .string()
      .required(
        "Date of birth required"
      ),

    bloodGroup: yup
      .string()
      .required(
        "Blood group required"
      ),

    gender: yup
      .string()
      .required("Gender required"),

    password: yup
      .string()
      .required(
        "Password required"
      )
      .min(
        6,
        "Password must be at least 6 characters"
      ),

    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Passwords must match"
      )
      .required(
        "Confirm password required"
      ),
  });