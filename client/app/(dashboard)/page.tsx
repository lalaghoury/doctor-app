"use client";

import AdminLandingPage from "@/components/admin/AdminLandingPage";
import DoctorLandingPage from "@/components/doctor/DoctorLandingPage";
import LandingPage from "@/components/Home/LandingPage";
import PatientLandingPage from "@/components/patient/PatientLandingPage";
import { useAppSelector } from "@/lib/hooks";

interface Auth {
  isLoggedIn: boolean;
  loading: boolean;
  user: {
    role: string;
  };
}

export default function Home() {
  const {
    isLoggedIn,
    loading,
    user: { role },
  } = useAppSelector((state) => state.auth);

  if (!loading && !isLoggedIn) {
    return <LandingPage />;
  }

  if (!loading && isLoggedIn && role === "patient") {
    return <PatientLandingPage />;
    // return <DoctorLandingPage />;
  }

  if (!loading && isLoggedIn && role === "admin") {
    return <AdminLandingPage />;
  }

  if (!loading && isLoggedIn && role === "doctor") {
    return <DoctorLandingPage />;
  }

  return <>Home</>;
}
