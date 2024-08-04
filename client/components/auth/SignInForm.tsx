"use client";

import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { UserSignin, UserSigninSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Icons } from "../ui/icons";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Form } from "../ui/form";

const SignInForm = ({ isDoctor = false }: { isDoctor?: boolean }) => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const { loading } = useAppSelector((state) => state.auth);

  const form = useForm<UserSignin>({
    resolver: zodResolver(UserSigninSchema),
  });

  const onSubmit = ({ email, password }: UserSignin) => {
    dispatch(
      authThunks.signin({
        values: { email, password },
        router
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
                <h1 className="text-2xl">Welcome Back 👋</h1>
                <p className="text-gray-500">
                  Please login to view your dashboard
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* EMAIL */}
              <CustomFormField
                fieldType={FormFieldType.EMAIL}
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="ex: abc@example.com"
              />

              <CustomFormField
                fieldType={FormFieldType.PASSWORD}
                control={form.control}
                name="password"
                label="Password"
              />

              <div className="flex flex-col gap-3 min-[350px]:flex-row items-center justify-between">
                <CardDescription>
                  New to Doctory?{" "}
                  <Link
                    className="font-semibold text-blue-500"
                    href={"/auth/sign-up"}
                  >
                    Sign up
                  </Link>
                </CardDescription>

                <CardDescription>
                  <Link
                    className="font-semibold text-blue-500"
                    href={"/auth/forgot-password"}
                  >
                    Forgot password
                  </Link>
                </CardDescription>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={loading} type="submit">
                {loading && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}{" "}
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
