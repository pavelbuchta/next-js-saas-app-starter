import useUser from "@/hooks/use-user";
import { Link, usePathname } from "@/i18n/navigation";
import { logOut } from "@/lib/actions";
import clsx from "clsx";
import React from "react";

export default function SidebarLink({
  children,
  href,
  icon,
  isCollapsed,
}: {
  children: React.ReactNode;
  href: string;
  icon: JSX.Element;
  isCollapsed: boolean;
}) {
  const { plan } = useUser();
  const pathname = usePathname();

  const baseStyle = clsx("h-fit", {
    "w-full": !isCollapsed,
    "w-fit": isCollapsed,
  });
  const parentStyle = clsx(baseStyle, {
    "[&>div]:hover:translate-x-2": !isCollapsed,
  });

  if (plan === "enterprise" && href === "/app/billing") {
    return null;
  }

  if (href === "LOGOUT") {
    return (
      <form className={baseStyle} action={logOut}>
        <button className={parentStyle} type="submit">
          <SidebarItem icon={icon} isCollapsed={isCollapsed}>
            {children}
          </SidebarItem>
        </button>
      </form>
    );
  }

  return (
    <Link className={parentStyle} href={href}>
      <SidebarItem
        active={pathname === href}
        icon={icon}
        isCollapsed={isCollapsed}
      >
        {children}
      </SidebarItem>
    </Link>
  );
}

function SidebarItem({
  children,
  icon,
  isCollapsed,
  active,
}: {
  children: React.ReactNode;
  icon: JSX.Element;
  isCollapsed: boolean;
  active?: boolean;
}) {
  const Icon = React.cloneElement(icon, {
    className: "h-[18px] w-[18px",
  });

  return (
    <div
      className={clsx(
        "flex items-center gap-3 p-2 font-medium text-muted-foreground duration-300 will-change-transform hover:text-foreground",
        {
          "my-1 h-[35px] w-[35px] rounded-full hover:bg-muted": isCollapsed,
          "!text-foreground": active,
        }
      )}
    >
      {Icon}
      <span className={clsx("", { "hidden opacity-0": isCollapsed })}>
        {children}
      </span>
    </div>
  );
}
