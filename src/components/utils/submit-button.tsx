import { Icons } from "@/components/icons";
import { Button, ButtonProps } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface SubmitButtonProps extends ButtonProps {
  isSubmitting: boolean;
}
export default function SubmitButton({
  isSubmitting,
  className,
  children,
  ...props
}: SubmitButtonProps) {
  const t = useTranslations("Components.Forms");

  return (
    <Button {...props} className={className} disabled={isSubmitting}>
      {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {isSubmitting ? t("loading") : children}
    </Button>
  );
}
