import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, { message: "name required." }),
    email: z.email({ message: "invalid email." }),
    password: z
      .string()
      .trim()
      .min(8, { message: "password must be 8+ characters." }),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.email({ message: "invalid email." }),
    password: z
      .string()
      .trim()
      .min(8, { message: "password must be 8+ characters." }),
  }),
});

export { registerSchema, loginSchema };
