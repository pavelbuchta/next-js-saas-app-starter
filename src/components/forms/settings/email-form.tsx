"use client";

import { Input } from "@/components/ui/input";
import FormMessage from "@/components/utils/form-message";
import { isEmailTaken, updateUserEmail } from "@/prisma/user";
import { useSession } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import SettingsFormBase from "./base";

export default function EmailSettingsForm() {
  const { update, data } = useSession();
  const user = data?.user;

  const [email, setEmail] = useState(user?.email);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (user.email === email) {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    const submitAsync = async () => {
      const emailTaken = await isEmailTaken(email as string);

      if (emailTaken) {
        setError("email_taken");
        setIsSubmitting(false);
        return;
      }

      const result = await updateUserEmail(email as string, user.id);

      if (result?.email) {
        await update({ user: { email: result.email } });
        setIsSubmitting(false);
      }
    };

    submitAsync();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <SettingsFormBase isSubmitting={isSubmitting} type="email">
        <Input
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(undefined);
          }}
        />
        <FormMessage message={error} />
      </SettingsFormBase>
    </form>
  );
}
