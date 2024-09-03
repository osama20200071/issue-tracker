import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});
export type TCreateIssueSchema = z.infer<typeof createIssueSchema>;

export const IssuesSchema = z.array(
  z.object({
    ...createIssueSchema.shape,
    id: z.number().optional(),
    status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional(),
  })
);
export type Issues = z.infer<typeof IssuesSchema>;
export const status = ["OPEN", "CLOSED", "IN_PROGRESS"] as const;

export const editIssuesSchema = createIssueSchema.extend({
  id: z.number().optional(),
  status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional(),
});

export type TEditIssueSchema = z.infer<typeof editIssuesSchema>;
