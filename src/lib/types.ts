import { z } from "zod";
import type { Timestamp } from "firebase/firestore";

export const taskSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }).max(100, { message: "Title cannot be longer than 100 characters."}),
  category: z.enum(["Work", "Study", "Personal"], { required_error: "Category is required." }),
  priority: z.enum(["Low", "Medium", "High"], { required_error: "Priority is required." }),
});

export type Task = z.infer<typeof taskSchema> & {
  id: string;
  completed: boolean;
  createdAt: Timestamp;
};
