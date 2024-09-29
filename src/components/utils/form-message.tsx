import { Messages } from "@/../global";
import { useTranslations } from "next-intl";

export type ErrorMessages =
  keyof Messages["Components"]["Forms"]["ErrorMessages"];

const isValidErrorMessage = (value: string): value is ErrorMessages => {
  const errorMessages: ErrorMessages[] = [
    "email_taken",
    "unknown_error",
    "required_error",
    "invalid_email",
    "invalid_credentials",
  ];

  return errorMessages.includes(value as ErrorMessages);
};

export default function FormMessage({
  message,
}: {
  message: string | undefined;
}) {
  const t = useTranslations("Components.Forms.ErrorMessages");

  const validatedMessage =
    message && isValidErrorMessage(message) ? message : "unknown_error";

  return (
    <div className="-mt-2 text-[0.8rem] font-medium text-destructive">
      {message ? t(validatedMessage) : undefined}
    </div>
  );
}
