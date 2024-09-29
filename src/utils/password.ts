"use server";

import bcrypt from "bcrypt";

const saltRounds = 10;

export async function saltAndHashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error salting and hashing password:", error);
    return "";
  }
}
