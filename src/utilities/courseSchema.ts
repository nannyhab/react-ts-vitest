import { z } from "zod";

const meetsRe = /^(M|Tu|W|Th|F)+ ([01]?\d|2[0-3]):[0-5]\d-([01]?\d|2[0-3]):[0-5]\d$/;

export const courseSchema = z.object({
  title: z.string().min(2, "Title must be at least two characters"),
  term: z.enum(["Fall", "Winter", "Spring", "Summer"]),
  number: z.string().regex(/^\d+(-\d+)?$/, "Number like 213 or 213-2"),
  meets: z.string().refine(
    (s) => s === "" || meetsRe.test(s),
    "must contain days and start-end, e.g., MWF 12:00-13:20"
  ),
});

export type CourseData = z.infer<typeof courseSchema>;