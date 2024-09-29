import { z } from "zod";

// Common validation rules
const emailValidation = z
  .string({ required_error: "required_error" })
  .min(1, "required_error")
  .email("invalid_email");

const passwordValidation = z
  .string({ required_error: "required_error" })
  .min(1, "required_error")
  .max(32, "Password must be less than 32 characters");

const nameValidation = z
  .string({ required_error: "required_error" })
  .min(1, "required_error");

// Schemas
export const logInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const nameSettingsSchema = z.object({
  name: nameValidation,
});

export const emailSettingsSchema = z.object({
  email: emailValidation,
});

export const passwordSettingsSchema = z.object({
  password: passwordValidation,
});
