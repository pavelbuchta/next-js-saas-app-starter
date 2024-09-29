"use client";

import { Input } from "@/components/ui/input";
import { updateUserPassword } from "@/prisma/user";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import SettingsFormBase from "./base";

export default function PasswordSettingsForm() {
  const { update, data } = useSession();
  const user = data?.user;

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  if (!user) return;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const submitAsync = async () => {
      const result = await updateUserPassword(password, user.id);

      if (result?.password) {
        await update({ user: { password: result.password } });
        setIsSubmitting(false);
        setPassword("");
      }
    };

    submitAsync();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <SettingsFormBase isSubmitting={isSubmitting} type="password">
        <div className="relative h-fit w-full">
          <Input
            type={isVisible ? "text" : "password"}
            id="new-password"
            name="new-password"
            autoComplete="new-password"
            required
            minLength={5}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={() => setIsVisible((prev) => !prev)}
            type="button"
            className="absolute bottom-0 right-0 top-0 flex aspect-square w-auto items-center justify-center text-muted-foreground duration-300 hover:text-foreground"
          >
            {isVisible ? <EyeOff size={"1rem"} /> : <Eye size={"1rem"} />}
          </button>
        </div>
      </SettingsFormBase>
    </form>
  );
}
