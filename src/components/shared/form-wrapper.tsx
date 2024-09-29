import { Card } from "../ui/card";

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:bg-background-secondary flex min-h-screen w-full justify-center md:items-center md:p-4">
      <Card className="p-mobile flex h-full w-full flex-col items-center gap-12 bg-background md:h-fit md:max-w-[490px] md:border md:p-8">
        {children}
      </Card>
    </div>
  );
}
