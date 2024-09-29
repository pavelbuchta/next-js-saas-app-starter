"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormMessage from "@/components/utils/form-message";
import SubmitButton from "@/components/utils/submit-button";
import { createUser, isEmailTaken } from "@/prisma/user";
import { signUpSchema } from "@/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export type SignUpFormFields = z.infer<typeof signUpSchema>;

export default function SignupForm() {
  const t = useTranslations();
  const form = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    try {
      const emailTaken = await isEmailTaken(data.email);

      if (emailTaken) {
        form.setError("email", { message: "email_taken" });
        return;
      }

      const result = await createUser(data);

      if (result?.error) form.setError("root", { message: "unknown_error" });
    } catch (error) {
      form.setError("root", { message: "unknown_error" });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>{t("Components.Forms.Inputs.name.label")}</FormLabel>
              <FormControl>
                <Input
                  type="name"
                  autoComplete="name"
                  placeholder={t("Components.Forms.Inputs.name.placeholder")}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage message={form.formState.errors.name?.message} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>{t("Components.Forms.Inputs.email.label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder={t("Components.Forms.Inputs.email.placeholder")}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage message={form.formState.errors.email?.message} />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>
                {t("Components.Forms.Inputs.password.label")}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="password"
                  placeholder={t(
                    "Components.Forms.Inputs.password.placeholder"
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage message={form.formState.errors.password?.message} />
        <FormMessage message={form.formState.errors.root?.message} />
        <SubmitButton
          className="mt-2"
          isSubmitting={form.formState.isSubmitting}
        >
          {t("Auth.Signup.submit")}
        </SubmitButton>
      </form>
    </Form>
  );
}
