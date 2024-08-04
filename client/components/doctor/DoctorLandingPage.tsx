import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { appointmentsThunks } from "@/lib/features/appointments/appointmentsThunks";
import { StatCard } from "@/components/StatCard";

const DoctorLandingPage = () => {
  const { appointments } = useAppSelector((state) => state.appointments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appointmentsThunks.getRecentAppointmentList());
  }, [dispatch]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 mt-14">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
          <StatCard
            type="completed"
            label="Completed appointments"
            icon={"/assets/icons/arrow.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments} />
      </main>
    </div>
  );
};

export default DoctorLandingPage;
