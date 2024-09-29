import { Icons } from "@/components/icons";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { footerColumns } from "./data";

export default function FooterColumn({
  column,
}: {
  column: (typeof footerColumns)[number];
}) {
  const t = useTranslations("Components.Footer");

  return (
    <div
      className={clsx("flex w-max flex-col gap-2", {
        "col-start-2": column.key === 3,
      })}
    >
      <h6 className="text-foreground">{t(`columns.${column.key}.headline`)}</h6>
      <div className="flex flex-col gap-2">
        {column.links.map((item) => {
          const blank = item.href.startsWith("https://");
          const key = `columns.${column.key}.links.${item.key}` as any;

          return (
            <Link
              className="flex items-center text-muted-foreground duration-300 hover:text-foreground"
              key={key}
              {...(blank && {
                rel: "noopener noreferrer",
                target: "_blank",
              })}
              href={item.href}
            >
              {t(key)}
              {blank && <Icons.linkArrow className="h-4" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
