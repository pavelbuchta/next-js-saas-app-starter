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
import { logIn } from "@/lib/actions";
import { logInSchema } from "@/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export type LoginFormFields = z.infer<typeof logInSchema>;

export default function LoginForm() {
  const t = useTranslations();
  const form = useForm<LoginFormFields>({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const result = await logIn(data.email, data.password);

      if (result?.error && result.error === "invalid_credentials") {
        form.setError("root", { message: "invalid_credentials" });
      } else if (result?.error) {
        form.setError("root", { message: "unknown_error" });
      }
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
          className={"mt-2"}
          isSubmitting={form.formState.isSubmitting}
        >
          {t("Auth.Login.submit")}
        </SubmitButton>
      </form>
    </Form>
  );
}
