"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function logIn(email: string, password: string) {
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid_credentials" };
        case "CallbackRouteError":
          return { error: "invalid_credentials" };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function logOut() {
  await signOut();
}
