import { z } from "zod";

export const BatchCreationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { message: "Name must be 4 or more characters long" })
    .max(32, { message: "Name must be 32 or fewer characters long" }),
  section: z.string().trim().min(1, { message: "Section is required" }),
  subject: z.string().trim().min(1, { message: "Subject is required" }),
  room: z.string().trim().min(1, { message: "Room is required" }),
});

export type BatchCreation = z.infer<typeof BatchCreationSchema>;
