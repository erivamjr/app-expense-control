import { z } from 'zod';

export const CategorySchema = z.object({
  user: z.object({
    id: z.string().uuid(),
  }).required(),
  category: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).min(3, { message: "Must be 1 or more characters long" }).max(50),
}).required();

// export type Category = z.infer<typeof CategorySchema>;