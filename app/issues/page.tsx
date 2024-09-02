// import IssueForm from "@/components/IssueForm";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesPage = () => {
  return (
    <div>
      <h1>IssuesPage</h1>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      {/* <IssueForm /> */}
    </div>
  );
};

export default IssuesPage;
