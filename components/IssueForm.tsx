"use client";
import { createIssueSchema, TCreateIssueSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const IssueForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TCreateIssueSchema>({
    resolver: zodResolver(createIssueSchema),
  });

  // this will get the validated data
  const onSubmit = async (data: TCreateIssueSchema) => {
    console.log(data);

    const response = await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Issue created successfully");
    } else {
      console.log("Something went wrong");
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form mt-8">
      <div className="formGroup">
        <label htmlFor="title">Title</label>
        <input id="title" placeholder="issue title" {...register("title")} />
        {errors.title && (
          <span className="err-msg">{`${errors.title.message}`}</span>
        )}
      </div>
      <div className="formGroup">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          placeholder="issue description"
          {...register("description")}
        />
        {errors.description && (
          <span className="err-msg">{`${errors.description.message}`}</span>
        )}
      </div>

      <button
        style={{
          cursor: isSubmitting ? "not-allowed" : "pointer",
          backgroundColor: isSubmitting ? "#000000a1" : "black",
        }}
        type="submit"
      >
        Create Issue
      </button>
    </form>
  );
};

export default IssueForm;
