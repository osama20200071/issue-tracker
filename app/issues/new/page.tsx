"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import {
  createIssueSchema,
  TCreateIssueSchema,
} from "@/utils/ValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TCreateIssueSchema>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: TCreateIssueSchema) => {
    console.log(data);

    const response = await fetch("/api/issues", {
      method: "POST",
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
          <Callout.Text>Failed to create an Issue</Callout.Text>
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
