"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),

  password: z
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      `Minimum eight characters, at least one uppercase letter, one lowercase letter and one number`,
    ),
});

export function LoginForm() {
  type dataForm = z.infer<typeof formSchema>;
  const form = useForm<dataForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "hassan.amer@gmail.com",
      password: "Hassan@123",
    },
  });

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("url");

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(data: dataForm) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      //callbackUrl: redirectUrl || "/products",
    });
    if (response?.ok) {
      toast.success("Login Successfully");
      router.push(redirectUrl || "/products");
    } else {
      toast.error(response?.error, { duration: 4000 });
    }
    setIsLoading(false);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login With Route</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">E-mail</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button disabled={isLoading} type="submit" form="form-rhf-demo">
            {isLoading && <Loader className="animate-spin" />}
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
