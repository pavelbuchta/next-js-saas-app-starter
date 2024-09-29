import SubmitButton from "@/components/utils/submit-button";
import { COMPANY_NAME } from "@/config";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function SettingsFormBase({
  type,
  children,
  isSubmitting,
}: {
  type: "avatar" | "name" | "email" | "password";
  children: React.ReactNode;
  isSubmitting?: boolean;
}) {
  const t = useTranslations();
  const isAvatar = type === "avatar";

  return (
    <div className="w-full rounded-lg border">
      <div
        className={clsx("p-4 md:p-8", {
          "flex justify-between pb-8 md:pb-12": isAvatar,
        })}
      >
        <div>
          <h2 className="mb-2 text-[24px] font-medium">
            {t(`Components.Forms.Inputs.${type}.settings.headline`)}
          </h2>
          <p className="text-[15px] md:text-base">
            {t.rich(`Components.Forms.Inputs.${type}.settings.description`, {
              br: () => <br />,
              companyName: COMPANY_NAME,
            })}
          </p>
        </div>
        {isAvatar ? (
          <div className="pl-4">{children}</div>
        ) : (
          <div className="mt-6 w-full md:w-[340px]">{children}</div>
        )}
      </div>
      <div
        className={clsx("border-t p-4 md:px-8", {
          "flex items-center justify-between md:py-4": !isAvatar,
          "md:py-6": isAvatar,
        })}
      >
        <p className="text-[15px] md:text-base">
          {t(`Components.Forms.Inputs.${type}.settings.note`)}
        </p>
        {!isAvatar && (
          <SubmitButton isSubmitting={isSubmitting || false}>
            {t(`Components.Forms.Inputs.${type}.settings.button`)}
          </SubmitButton>
        )}
      </div>
    </div>
  );
}
