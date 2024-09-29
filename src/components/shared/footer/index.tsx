"use client";

import constants from "@/config/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { footerColumns } from "./data";
import FooterColumn from "./footer-column";

export default function Footer() {
  const t = useTranslations("Components.Footer");

  return (
    <footer className="text-foreground-tertiary mt-40 flex justify-center border-t bg-background px-4 py-[60px] text-[15px] @container md:px-[40px]">
      <div className="max-w-content flex w-full flex-col justify-between @md:flex-row">
        <div className="flex flex-col flex-wrap gap-8 gap-x-20 @[800px]:flex-row lg:gap-x-20">
          <FooterColumn column={footerColumns[0]} />
          <div className="flex flex-col gap-8 @md:gap-4">
            <FooterColumn column={footerColumns[1]} />
            <FooterColumn column={footerColumns[2]} />
          </div>
          <FooterColumn column={footerColumns[3]} />
        </div>
        <div className="mt-8 flex flex-col items-start gap-2 whitespace-nowrap text-muted-foreground md:mt-0 md:items-end md:gap-20 md:text-end lg:gap-40">
          <div>
            <div className="text-foreground">
              Designed and built by{" "}
              <Link
                className="underline"
                href={constants.credit.websiteUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {constants.credit.websiteDomain}
              </Link>
            </div>
            <div>@ Copyright 2024 Noketa, All rights reserved</div>
          </div>
          <Link href={"#start"} className="cursor-pointer">
            {t("scrollToTop")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
