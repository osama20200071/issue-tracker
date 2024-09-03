import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.delete({
    where: { id: +params.id },
  });

  if (!issue) {
    return NextResponse.json("Failed to delete the issue", { status: 500 });
  }

  return NextResponse.json({ status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const updatedIssue = await prisma.issue.update({
    where: { id: +params.id },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  // mocking delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!updatedIssue) {
    return NextResponse.json("Failed to update the issue", { status: 500 });
  }

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const Issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!Issue) {
    return NextResponse.json("Failed to update the issue", { status: 404 });
  }

  return NextResponse.json(Issue, { status: 200 });
}
