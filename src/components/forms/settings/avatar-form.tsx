import AvatarInput from "@/components/forms/settings/avatar-input";
import SettingsFormBase from "./base";

export default function AvatarSettingsForm() {
  return (
    <SettingsFormBase type="avatar">
      <AvatarInput />
    </SettingsFormBase>
  );
}
