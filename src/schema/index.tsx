import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const videoSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),
  year: yup
    .string()
    .required("Publishing year is required")
    .max(new Date().getFullYear(), `Year cannot be in the future`),
  file: yup.mixed().required("File is required"),
});
