import z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is required" })
    .max(30, { message: "Name must be less than 30 characters" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(30, { message: "Password must be less than 30 characters" }),
});
