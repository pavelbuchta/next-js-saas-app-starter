import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Avatar({ imageUrl }: { imageUrl?: string | null }) {
  const t = useTranslations("Components.Forms.Inputs.avatar");

  return imageUrl ? (
    <Image
      priority
      width={200}
      height={200}
      className="h-full w-full"
      alt={t("label")}
      src={imageUrl}
    />
  ) : (
    <Image
      priority
      width={200}
      height={200}
      className="h-full w-full"
      alt={t("label")}
      src={"/default-profile-picture.jpeg"}
    />
  );
}
