import { Icons } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import SignupForm from "./form";

export default function SignupPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Auth.Signup");

  return (
    <>
      <Icons.logo />
      <div className="-mt-2 w-full">
        <h1 className="text-center text-[28px]">{t("headline")}</h1>
        <p className="mb-8 mt-2 text-center text-base">{t("body")}</p>
        <SignupForm />
      </div>
      <div className="text-center text-[14px] text-muted-foreground">
        {t("bottomText")}{" "}
        <Link
          href={"/login"}
          className="font-medium text-foreground hover:underline"
        >
          {t("switch")}
        </Link>
      </div>
    </>
  );
}
