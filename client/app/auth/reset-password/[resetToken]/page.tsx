"use client";

import React from "react";
import Link from "next/link";
import { ResetPassword, ResetPasswordSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/auth/CustomFormField";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    resetToken: string;
  };
}

const ResetPasswordPage = ({ params }: Props) => {
  const { resetToken } = params;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  const form = useForm<ResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = ({ password }: ResetPassword) => {
    dispatch(
      authThunks.resetPassword({
        values: { password },
        resetToken,
        router,
      })
    );
  };

  return (
    <div className="flex gap-10 justify-between items-start max-h-screen">
      <div className="w-[40%] h-full">
        <Image
          src={"/assets/images/register-img.png"}
          alt="forgot-password"
          width={1000}
          height={1000}
          className="h-screen w-full object-cover"
        />
      </div>

      <div className="w-[60%] flex flex-col space-y-6 justify-center mt-24">
        <h1 className="text-4xl text-primary font-extrabold">New Password</h1>

        <Form {...form}>
          <form
            className="flex gap-6 flex-col max-w-md"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Password */}
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label="Password"
              placeholder="New Password"
            />

            {/* Confirm Password */}
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
            />

            <div className="flex items-center gap-2 justify-between self-end max-w-sm">
              <Link className="link text-sec" href={"/auth/sign-in"}>
                <Button>Back to Login</Button>
              </Link>

              <Button disabled={loading} type="submit">
                {loading && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}{" "}
                {loading ? "Resetting..." : "Reset Now"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
