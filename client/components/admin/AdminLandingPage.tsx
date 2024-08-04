import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { appointmentsThunks } from "@/lib/features/appointments/appointmentsThunks";
import { StatCard } from "@/components/StatCard";
import { ContentLayout } from "@/components/admin/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const AdminLandingPage = () => {
  const { appointments } = useAppSelector((state) => state.appointments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appointmentsThunks.getRecentAppointmentList());
  }, [dispatch]);

  return (
    <ContentLayout title="Admin | Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="rounded-lg border-none mt-6 bg-background h-full">
        <CardContent className="p-6 mx-auto flex max-w-[1440px] flex-col space-y-14">
          <section className="w-full space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">
              Start the day with managing new pending approvals
            </p>
          </section>

          <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
            <StatCard
              type="pending"
              label="Pending approvals"
              icon={"/assets/icons/pending.svg"}
            />
            <StatCard
              type="cancelled"
              label="Cancelled approvals"
              icon={"/assets/icons/cancelled.svg"}
            />
            <StatCard
              type="completed"
              label="Veified approvals"
              icon={"/assets/icons/verified.svg"}
            />
          </section>

          <DataTable columns={columns} data={appointments} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default AdminLandingPage;
