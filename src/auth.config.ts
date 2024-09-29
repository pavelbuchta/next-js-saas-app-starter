import type { NextAuthConfig, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { i18n } from "./i18n/config";

const intlMiddleware = createMiddleware(i18n);

export const authConfig = {
  pages: {
    signIn: `/${i18n.defaultLocale}/login`,
    newUser: `/${i18n.defaultLocale}/signup`,
  },
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;

      const isOnApp = i18n.locales.some((locale) =>
        pathname.startsWith(`/${locale}/app`)
      );
      const isOnAuth = i18n.locales.some(
        (locale) =>
          pathname.startsWith(`/${locale}/login`) ||
          pathname.startsWith(`/${locale}/signup`)
      );
      const isOnCheckout = i18n.locales.some((locale) =>
        pathname.startsWith(`/${locale}/app/checkout`)
      );
      const isOnBilling = i18n.locales.some((locale) =>
        pathname.startsWith(`/${locale}/app/billing`)
      );

      const isEnglish = pathname.startsWith("/en");
      const isCzech = pathname.startsWith("/cs");
      const localePrefix = isEnglish
        ? "en"
        : isCzech
          ? "cs"
          : i18n.defaultLocale;

      const isEnterprise = auth?.user?.isEnterprise;
      const isPro = auth?.user?.subscription?.status === "active";

      const defaultRedirect = Response.redirect(
        new URL(`/${localePrefix}/app`, request.nextUrl)
      );
      const loginRedirect = Response.redirect(
        new URL(`/${localePrefix}/login`, request.nextUrl)
      );

      if (!isLoggedIn && !isOnAuth) {
        return loginRedirect;
      }

      if (
        (isOnBilling && isEnterprise) ||
        (isOnCheckout && (isEnterprise || isPro)) ||
        (!isOnApp && isLoggedIn)
      ) {
        return defaultRedirect;
      }

      if (isEnglish || isCzech) {
        return intlMiddleware(request);
      }

      return true;
    },
    jwt(params: {
      token: JWT;
      user: any;
      trigger?: "signIn" | "signUp" | "update";
      session?: any;
    }) {
      const { token, user, trigger, session } = params;

      if (user?.id) {
        token.user = user;
      }

      if (trigger === "update" && session) {
        token.user = { ...token.user, ...session.user };
      }

      return token;
    },
    session(params: { session: Session; token: JWT }) {
      const { session, token } = params;

      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
