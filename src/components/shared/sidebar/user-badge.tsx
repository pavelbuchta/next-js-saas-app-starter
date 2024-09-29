import { Badge } from "@/components/ui/badge";

export default function UserBadge({
  plan,
}: {
  plan: "free" | "enterprise" | "pro";
}) {
  return (
    <Badge
      variant={
        plan === "enterprise" ? "violet" : plan === "pro" ? "cyan" : "amber"
      }
    >
      {plan.toUpperCase()}
    </Badge>
  );
}
