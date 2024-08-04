"use client";

import React from "react";
import { CardStackPlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { UserPopup } from "@/components/Navbar/UserPopup";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  return (
    <header className="w-full h-14 flex items-center justify-between bg-background px-4 p-5">
      <div className="flex items-center space-x-3 cursor-pointer">
        <Link href="/" className="flex space-x-2 items-center">
          <CardStackPlusIcon className="h-4 w-4" />
          <span>Doctory</span>
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <ModeToggle />

        {isLoggedIn ? (
          <>
            <UserPopup />
          </>
        ) : (
          <>
            <Link href={`/auth/sign-up`} className="font-bold">
              <Button>Sign Up</Button>
            </Link>
            <Link href={`/auth/sign-in`} className="font-bold">
              <Button variant={"secondary"}>Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
