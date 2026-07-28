// app/lib/validations.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['TENANT', 'LANDLORD']),
});

export const rentalRequestSchema = z.object({
  moveInDate: z.string().min(1, 'Move-in date is required'),
  durationMonths: z.number().min(1, 'Duration must be at least 1 month'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(5, 'Review comment must be at least 5 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RentalRequestInput = z.infer<typeof rentalRequestSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;