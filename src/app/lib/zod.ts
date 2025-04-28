import { object, string } from "zod";

export const logInSchema = object({
  user: string({ required_error: "User is required" }).min(
    1,
    "User is required"
  ),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(4, "Password must be 4 at least"),
});
