import FormWrapper from "@/components/shared/form-wrapper";
import React from "react";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormWrapper>{children}</FormWrapper>;
}
