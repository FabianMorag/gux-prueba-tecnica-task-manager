import { object, string } from "zod";

export const logInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "User is required")
    .email("Invalid email address"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(4, "Password must be 4 at least"),
});
