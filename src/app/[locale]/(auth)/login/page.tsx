import { Icons } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import LoginForm from "./form";

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Auth.Login");

  return (
    <>
      <Icons.logo />
      <div className="-mt-2 w-full">
        <h1 className="text-center text-[28px]">{t("headline")}</h1>
        <p className="mb-8 mt-2 text-center text-base">{t("body")}</p>
        <LoginForm />
      </div>
      <div className="text-center text-[14px] text-muted-foreground">
        {t("bottomText")}{" "}
        <Link
          href={"/signup"}
          className="font-medium text-foreground hover:underline"
        >
          {t("switch")}
        </Link>
      </div>
    </>
  );
}
