import { Card } from "@/components/ui/card";
import React from "react";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:bg-background-secondary flex h-screen max-h-screen w-full justify-center md:items-center md:p-4">
      <Card className="w-full bg-background md:h-full md:max-h-[620px] md:max-w-[490px] md:border">
        {children}
      </Card>
    </div>
  );
}
