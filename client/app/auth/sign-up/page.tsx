"use client";

import DoctorSignUpForm from "@/components/auth/DoctorSignUpForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const [role, setRole] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "doctor" || role?.startsWith("d")) {
      setRole("doctor");
    } else if (role === "patient" || role?.startsWith("p")) {
      setRole("patient");
    } else {
      setRole("patient");
    }
  }, [searchParams]);

  return (
    <div className="">
      {role === "doctor" ? <DoctorSignUpForm /> : <SignUpForm />}
    </div>
  );
}
