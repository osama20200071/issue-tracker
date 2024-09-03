"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import {
  editIssuesSchema,
  status,
  TEditIssueSchema,
} from "@/utils/ValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Callout,
  Flex,
  RadioCards,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const EditIssuePage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState<TEditIssueSchema>();

  useEffect(() => {
    const fetchIssue = async () => {
      const response = await fetch(`/api/issues/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const validated = editIssuesSchema.safeParse(data);
        console.log(validated);
        setIssue(data);
      } else {
        // setError("Error fetching issue schema");
      }
    };

    fetchIssue();
  }, [id]);

  return <div>{issue ? <EditForm issue={issue} /> : <Spinner />}</div>;
};

export default EditIssuePage;

const EditForm = ({ issue }: { issue: TEditIssueSchema }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TEditIssueSchema>({
    resolver: zodResolver(editIssuesSchema),
    defaultValues: {
      description: issue?.description,
      title: issue?.title,
      status: issue?.status,
    },
  });

  // update the issue
  const onSubmit = async (data: TEditIssueSchema) => {
    console.log(data);

    const response = await fetch(`/api/issues/${issue.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push("/issues");
    } else {
      // when having error from the server
      setError("Error fetching issue schema");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>Failed to update the Issue</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-7">
        <div className="formGroup">
          <TextField.Root placeholder="issue title" {...register("title")} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <div className="formGroup">
          <TextArea
            placeholder="issue description"
            {...register("description")}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <Box maxWidth="600px">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <RadioCards.Root
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
                size="1"
                columns={{ initial: "1", sm: "3" }}
              >
                {status.map((state) => (
                  <RadioCards.Item key={state} value={state}>
                    <Text>{state}</Text>
                  </RadioCards.Item>
                ))}
              </RadioCards.Root>
            )}
          />
        </Box>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
