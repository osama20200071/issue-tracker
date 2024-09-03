import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return <span className="err-msg">{children}</span>;
};

export default ErrorMessage;
