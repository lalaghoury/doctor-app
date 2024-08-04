import React from "react";
import { AppointmentForm } from "../forms/AppointmentForm";
import { useAppSelector } from "@/lib/hooks";

const PatientLandingPage = () => {
  const { _id } = useAppSelector((state) => state.auth.user);
  return (
    <div>
      <AppointmentForm patientId={_id} type="create" userId={_id} />
    </div>
  );
};

export default PatientLandingPage;
