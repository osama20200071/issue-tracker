"use client";
import { Issues, IssuesSchema } from "@/utils/ValidationSchemas";
import { AlertDialog, Button, Flex, Table, Inset } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const IssuesList = () => {
  const [issues, setIssues] = useState<Issues>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await fetch("/api/issues");
      const data: unknown = await response.json();

      console.log(data);

      const validatedIssues = IssuesSchema.safeParse(data);

      if (validatedIssues.success) {
        setIssues(validatedIssues.data);
      }
    };

    fetchIssues();
  }, []);

  const handleRemove = async (id: number) => {
    const response = await fetch(`/api/issues/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setIssues((prev) => prev.filter((issue) => issue.id !== id));
    }
  };

  return (
    <div>
      <Table.Root variant="surface" size="3" className="mt-8">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
              <Table.Cell>{issue.description}</Table.Cell>
              <Table.Cell>{issue.status}</Table.Cell>
              <Table.Cell className="space-x-2">
                <DeleteIssueButton issue={issue} handleRemove={handleRemove} />
                <Button>
                  <Link href={`/issues/${issue.id}`}>Edit</Link>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesList;

type DeleteIssueButtonProps = {
  issue: Issues[number];
  handleRemove: (id: number) => void;
};

const DeleteIssueButton = ({ issue, handleRemove }: DeleteIssueButtonProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure to delete this issue?
        </AlertDialog.Description>

        <Inset side="x" my="5">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
                <Table.Cell>{issue.description}</Table.Cell>
                <Table.Cell>{issue.status}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Inset>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={() => handleRemove(issue.id)}
            >
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
