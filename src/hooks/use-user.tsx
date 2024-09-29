"use client";

import { getUserById } from "@/prisma/user";
import { useSession } from "next-auth/react";

export default function useUser() {
  const { data, update } = useSession();
  const user = data?.user;

  const isEnterprise = user?.isEnterprise;
  const isPro = user?.subscription?.status === "active";

  const plan = isEnterprise ? "enterprise" : isPro ? "pro" : "free";

  const revalidateSession = async () => {
    if (!user?.id) {
      return;
    }

    const updatedUser = await getUserById(user.id);
    await update({ user: updatedUser });
  };

  return { plan, user, update, revalidateSession } as const;
}
