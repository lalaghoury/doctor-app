"use client";

import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UserSignup, UserSignupSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Icons } from "../ui/icons";
import { useRouter } from "next/navigation";

const SignUpForm = ({ isDoctor = false }: { isDoctor?: boolean }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading } = useAppSelector((state) => state.auth);

  const form = useForm<UserSignup>({
    resolver: zodResolver(UserSignupSchema),
  });

  const onSubmit = ({ name, email, password, phone }: UserSignup) => {
    dispatch(
      authThunks.signup({
        values: {
          name,
          email,
          password,
          phone,
          role: "patient",
        },
        router,
      })
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="space-y-4">
                <h1 className="text-2xl">Hi there 👋</h1>
                <p className="text-gray-500">Get started with appointments.</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* NAME */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="ex: Aasil Ghoury"
              />

              {/* EMAIL */}
              <CustomFormField
                fieldType={FormFieldType.EMAIL}
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="ex: abc@example.com"
              />

              {/* PHONE */}
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="+00 0342 0453 34"
              />

              <CustomFormField
                fieldType={FormFieldType.PASSWORD}
                control={form.control}
                name="password"
                label="Password"
              />

              <CustomFormField
                fieldType={FormFieldType.PASSWORD}
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
              />

              <CardDescription>
                Already have an account?{" "}
                <Link
                  className="font-semibold text-blue-500"
                  href={"/auth/sign-in"}
                >
                  Sign in
                </Link>
              </CardDescription>

              <CardDescription>
                Wanna join as a doctor?{" "}
                <Link
                  className="font-semibold text-blue-500"
                  href={"/auth/sign-up?role=doctor"}
                >
                  Apply Now!
                </Link>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={loading} type="submit">
                {loading && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}{" "}
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
