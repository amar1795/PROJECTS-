import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const RegisterSchema = z.object({
  firstname: z.string().min(1, {
    message: "firstname is required",
  }),
  lastname: z.string().min(1, {
    message: "lastname is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }).regex(passwordRegex, {
    message: "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character",
  }),
  confirmpassword: z.string()
}).refine(
  (values) =>
   values.password === values.confirmpassword
  ,
  {
    message: "Please enter the same Password !",
    path: ["confirmpassword"],
  }
)

export const AddressSchema = z.object({
  street: z.string().min(1, { message: "Street is required" }).max(255),
  landmark: z.string().min(1, { message: "Landmark is required" }).max(255),
  city: z.string().min(1, { message: "City is required" }).max(255),
  state: z.string().min(1, { message: "State is required" }).max(255),
  country: z.string().min(1, { message: "Country is required" }).max(255),
  postalCode: z
  .string()
  .nonempty({ message: "Postal code is required" })
  .regex(/^\d+$/, { message: "Postal code must be a number" }),
  firstName: z.string().min(1, { message: "First name is required" }).max(100),
  lastName: z.string().min(1, { message: "Last name is required" }).max(100),
  apartment: z.string().min(1, { message: "Apartment is required" }).max(100),
  phoneNumber: z
  .string()
  .nonempty({ message: "Phone number is required" })
  .regex(/^\d+$/, { message: "Phone number must be a number" }),


});
