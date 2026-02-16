"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { registerSchema } from "@/ValidationSchema/RegisterSchema";
import { RegisterInterface } from "@/Interfaces/RegisterInterface";
import { registerUser } from "@/Actions/Auth/auth.action";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function Register() {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  type dataForm = z.infer<typeof registerSchema>;
  const registerForm = useForm<dataForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const {
    formState: { errors },
  } = registerForm;

  async function signUp(values: dataForm) {
    setLoading(true);
    const response = await registerUser(values as unknown as RegisterInterface);
    if (response.message !== "success") {
      toast.error(response.message);
    } else {
      router.push("/login");
    }
    setLoading(false);
  }

  return (
    <div className=" min-h-screen flex justify-center items-center flex-col gap-6">
      <h1 className="text-2xl text-center font-bold">
        Register now and Join US{" "}
      </h1>
      <div className="shadow-2xl shadow-gray-500 w-md bg-white rounded-2xl p-5">
        <form
          onSubmit={registerForm.handleSubmit(signUp)}
          className="flex flex-col gap-4"
        >
          <FieldGroup className="gap-3">
            <Controller
              name="name"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">
                    User Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="User Name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2" data-invalid={fieldState.invalid}>
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
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2" data-invalid={fieldState.invalid}>
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
            <Controller
              name="rePassword"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-rePassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="form-rhf-demo-rePassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-phone">Phone</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="0123456789"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button color="primary" type="submit">
            {Loading && <LoaderCircleIcon className="animate-spin" />}
            Register
          </Button>
        </form>
        <p className="text-center mt-5">
          If you have an account go to{" "}
          <Link
            href={"/login"}
            className="text-blue-600 cursor-pointer font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
