"use client";
import { Issues, IssuesSchema } from "@/utils/schema";
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
  return (
    <div>
      <ul className="flex flex-col gap-5 mt-2">
        {issues.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <span>{item.description}</span>
            <span>{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssuesList;
