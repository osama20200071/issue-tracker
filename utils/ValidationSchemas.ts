import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});
export type TCreateIssueSchema = z.infer<typeof createIssueSchema>;

export const IssuesSchema = z.array(
  z.object({
    ...createIssueSchema.shape,
    id: z.number(),
    status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]),
  })
);

export type Issues = z.infer<typeof IssuesSchema>;
