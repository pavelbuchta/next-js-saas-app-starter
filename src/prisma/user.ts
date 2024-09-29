"use server";

import { SignUpFormFields } from "@/app/[locale]/(auth)/signup/form";
import { logIn } from "@/lib/actions";
import { stripe } from "@/vendor/stripe";
import bcrypt from "bcrypt";
import { headers } from "next/headers";
import prisma from ".";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
    include: { subscription: true },
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: { subscription: true },
  });

  return user;
}

export async function createUser(data: SignUpFormFields) {
  const { name, email, password } = data;

  try {
    // Hash the password before the async operations to keep those operations fast.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Start creating the Stripe customer and the user in the database concurrently.
    const stripeCustomerPromise = stripe.customers.create({ email });
    const userCreationPromise = prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Password is now hashed
      },
    });

    // Wait for both promises to resolve.
    const [stripeCustomer, user] = await Promise.all([
      stripeCustomerPromise,
      userCreationPromise,
    ]);

    // Execute the user update and logIn concurrently since they are independent.
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: stripeCustomer.id },
    });

    return await logIn(updatedUser.email, password);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserPassword(password: string, userId: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserAvatar(
  image: { imageUrl: string; publicId: string },
  userId: string
) {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        publicId: image.publicId,
        imageUrl: image.imageUrl,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserName(name: string, userId: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
      },
    });

    await stripe.customers.update(updatedUser.stripeCustomerId as string, {
      name: name,
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserEmail(email: string, userId: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
      },
    });

    await stripe.customers.update(updatedUser.stripeCustomerId as string, {
      email: email,
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function isEmailTaken(email: string) {
  const _ = headers();

  const user = await prisma.user.findUnique({ where: { email: email } });

  return user;
}
