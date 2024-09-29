"use client";

import { Input } from "@/components/ui/input";
import { updateUserName } from "@/prisma/user";
import { useSession } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import SettingsFormBase from "./base";

export default function NameSettingsForm() {
  const { update, data } = useSession();
  const user = data?.user;

  const [name, setName] = useState(user?.name);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (user.name === name) {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    const submitAsync = async () => {
      const result = await updateUserName(name as string, user.id);

      if (result?.name) {
        await update({ user: { name: result.name } });
        setIsSubmitting(false);
      }
    };

    submitAsync();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <SettingsFormBase isSubmitting={isSubmitting} type="name">
        <Input
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </SettingsFormBase>
    </form>
  );
}
