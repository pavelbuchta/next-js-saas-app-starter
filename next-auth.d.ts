import { getUserByEmail } from "@/prisma/user";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] &
  Awaited<ReturnType<typeof getUserByEmail>>;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: ExtendedUser;
  }
}
