import { z } from 'zod';

export const CategorySchema = z.object({
  user: z.object({
    id: z.string().uuid(),
  }).required(),
  category: z.string({
    required_error: "Category is required",
    invalid_type_error: "Category must be a string",
  }).min(1, { message: "Must be 1 or more characters long" }).max(50),
}).required();

export const TransactionsSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  type: z.string({
    required_error: "Type is required",
    invalid_type_error: "Type must be a string",
  }).min(1).max(50),
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  category: z.string({
    required_error: "Category is required",
    invalid_type_error: "Category must be a string",
  }),
});

export type TransactionsType = z.infer<typeof TransactionsSchema>;

export const LoginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(6).max(50),
});

export const UserSchema = LoginSchema.extend({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).min(1).max(50),
});

export const RegisterSchema = UserSchema.extend({
  id: z.string().uuid(),
  role: z.string()
}).omit({ password: true });

export type UserType = z.infer<typeof RegisterSchema>;