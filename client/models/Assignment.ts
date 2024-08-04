import { z } from "zod";

export const AssignmentCreationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, { message: "Name must be 4 or more characters long" })
    .max(32, { message: "Name must be 32 or fewer characters long" }),
  instructions: z
    .string()
    .trim()
    .min(1, { message: "Instructions are required" }),
  attachments: z.array(z.instanceof(FileList)),
});

export type AssignmentCreation = z.infer<typeof AssignmentCreationSchema>;
