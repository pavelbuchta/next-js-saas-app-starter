"use client";

import { Icons } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Suspense, useState } from "react";
import { sidebarGroups } from "./data";
import SidebarLink from "./sidebar-link";
import UserCard from "./user-profile";

export default function DashboardSidebar() {
  const t = useTranslations("Components.Sidebar");

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <header
      className={clsx(
        "scrollbar-hidden relative h-full overflow-x-visible overflow-y-scroll border-r bg-background",
        {
          "w-[300px] min-w-[300px] max-md:[&+div]:blur-[50px]": !isCollapsed,
          "w-fit": isCollapsed,
        }
      )}
    >
      <div
        className={clsx(
          "sticky top-0 z-10 flex w-full items-center justify-between border-b bg-[rgba(20,21,21,0.2)] backdrop-blur-[20px] duration-300 [-webkit-backdrop-blur:20px]",
          {
            "border-border px-6 py-5": !isCollapsed,
            "border-transparent p-4": isCollapsed,
          }
        )}
      >
        <Link href={"/app"}>
          <Icons.logo
            className={clsx("logo-hover", {
              hidden: isCollapsed,
              relative: !isCollapsed,
            })}
          />
        </Link>
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="relative flex h-[40px] w-[40px] items-center justify-center rounded-full text-foreground opacity-70 duration-300 hover:bg-background hover:opacity-100"
        >
          {isCollapsed ? (
            <Icons.maximizeSidebar className="h-5 w-5" />
          ) : (
            <Icons.minimizeSidebar className="h-5 w-5" />
          )}
        </button>
      </div>
      <div
        className={clsx("flex w-full flex-col gap-4 pt-8", {
          "p-6": !isCollapsed,
          "p-4": isCollapsed,
        })}
      >
        {sidebarGroups.map((group, index) => {
          const groupIndex = (index + 1) as 1 | 2 | 3;

          return (
            <div className="w-full" key={groupIndex}>
              <h4
                className={clsx("text-[18px] font-medium", {
                  hidden: isCollapsed,
                })}
              >
                {t(`${groupIndex}.headline`)}
              </h4>
              <ul className="mt-3 w-full">
                {group.map((link) => {
                  const key = `${groupIndex}.${link.key}` as any;

                  return (
                    <SidebarLink
                      key={key}
                      icon={link.icon}
                      href={link.href}
                      isCollapsed={isCollapsed}
                    >
                      {t(key)}
                    </SidebarLink>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <Suspense>
        <UserCard isCollapsed={isCollapsed} />
      </Suspense>
    </header>
  );
}
