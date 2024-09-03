import prisma from "@/prisma/client";
import { createIssueSchema } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validated = createIssueSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(validated.error.errors, { status: 400 });
  }

  // connect to db and create the create the issue
  const newIssue = await prisma.issue.create({
    data: {
      description: validated.data.description,
      title: validated.data.title,
    },
  });

  // mocking delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // then respond back with the created issue
  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(req: NextRequest) {
  const issues = await prisma.issue.findMany();

  // then respond back with the created issue
  return NextResponse.json(issues, { status: 200 });
}
