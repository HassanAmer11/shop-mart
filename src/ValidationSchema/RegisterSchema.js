import * as zod from "zod";
export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "minimum length 3 characters ")
      .max(20, "maximum length 20 characters"),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),

    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        `Minimum eight characters, at least one uppercase letter, one lowercase letter and one number`
      ),
    rePassword: zod.string().nonempty("rePassword is required"),
    phone: zod.string().nonempty("phone is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "password and rePassword don't match",
  });
