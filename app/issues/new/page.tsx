"use client";

import { createIssueSchema, TCreateIssueSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const NewIssuePage = () => {
  const router = useRouter();
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
      // we need to make a toast
      console.log("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-7">
      <div className="formGroup">
        <TextField.Root placeholder="issue title" {...register("title")} />
        {errors.title && (
          <span className="err-msg">{`${errors.title.message}`}</span>
        )}
      </div>

      <div className="formGroup">
        <TextArea
          placeholder="issue description"
          {...register("description")}
        />
        {errors.description && (
          <span className="err-msg">{`${errors.description.message}`}</span>
        )}
      </div>

      <Button type="submit">Create Issue</Button>
    </form>
  );
};

export default NewIssuePage;
