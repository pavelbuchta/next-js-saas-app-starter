"use client";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";
import { Link, usePathname } from "@/i18n/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Avatar from "../avatar";
import UserBadge from "./user-badge";

export default function UserProfile({ isCollapsed }: { isCollapsed: boolean }) {
  const { user, plan } = useUser();
  const pathname = usePathname();

  const t = useTranslations("App.Pricing.Plans.pro");

  if (!user) {
    return null;
  }

  if (plan !== "free")
    return (
      <div className="sticky bottom-0 z-10">
        <div className="h-10 w-full bg-gradient-to-t from-background to-transparent" />
        <div
          className={clsx("bg-background p-6", {
            hidden: isCollapsed,
          })}
        >
          <Link href={"/app/settings"} className="flex items-center gap-3">
            <div className="relative h-[35px] w-[35px] min-w-[35px] overflow-hidden rounded-full bg-foreground">
              <Avatar imageUrl={user.imageUrl} />
            </div>
            <div className="flex flex-col text-[14px] leading-tight">
              <div className="flex items-center gap-2 text-foreground">
                <span>{user.name}</span>
                <UserBadge plan={plan} />
              </div>
              <div className="text-foreground-tertiary">{user.email}</div>
            </div>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="sticky bottom-0 z-10">
      <div className="h-10 w-full bg-gradient-to-t from-background to-transparent" />
      <div
        className={clsx("bg-background p-6", {
          hidden: isCollapsed,
        })}
      >
        <Link href={"/app/settings"} className="mb-6 flex items-center gap-3">
          <div className="relative h-[35px] w-[35px] min-w-[35px] overflow-hidden rounded-full bg-foreground">
            <Avatar imageUrl={user.imageUrl} />
          </div>
          <div className="flex flex-col text-[14px] leading-tight">
            <div className="flex items-center gap-2 text-foreground">
              <span>{user.name}</span>
              <UserBadge plan={plan} />
            </div>
            <div className="text-muted-foreground">{user.email}</div>
          </div>
        </Link>
        <Button asChild className="w-full">
          <Link
            href={
              pathname.startsWith("/app/billing")
                ? "/app/checkout?billingPeriod=yearly"
                : "/app/billing"
            }
          >
            {t("cta")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
