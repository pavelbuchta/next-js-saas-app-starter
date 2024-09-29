import AvatarSettingsForm from "@/components/forms/settings/avatar-form";
import EmailSettingsForm from "@/components/forms/settings/email-form";
import NameSettingsForm from "@/components/forms/settings/name-form";
import PasswordSettingsForm from "@/components/forms/settings/password-form";
import { unstable_setRequestLocale } from "next-intl/server";

export default function SettingsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-12">
      <AvatarSettingsForm />
      <NameSettingsForm />
      <EmailSettingsForm />
      <PasswordSettingsForm />
    </div>
  );
}
