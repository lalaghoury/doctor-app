import { appointmentsThunks } from "@/lib/features/appointments/appointmentsThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled" | "completed";
  label: string;
  icon: string;
};

export const StatCard = ({ label, icon, type }: StatCardProps) => {
  const { appointments } = useAppSelector((state) => state.appointments);
  const dispatch = useAppDispatch();

  const filteredAppointments = appointments.filter((a) => a.status === type);

  useEffect(() => {
    dispatch(appointmentsThunks.getAllAppointments());
  }, [dispatch]);

  return (
    <div
      className={clsx(
        "flex flex-1 items-center justify-between gap-6 rounded-2xl bg-cover p-6 shadow-lg",
        {
          "bg-yellow-600": type === "appointments",
          "bg-blue-600": type === "pending",
          "bg-red-600": type === "cancelled",
          "bg-green-600": type === "completed",
        }
      )}
    >
      <div className="flex flex-1 flex-col gap-6 w-full">
        <div className="flex items-center gap-4">
          <Image
            src={icon}
            height={32}
            width={32}
            alt="appointments"
            className="size-8 w-fit"
          />
          <h2 className="text-32-bold">{filteredAppointments.length}</h2>
        </div>

        <p className="text-14-regular">{label}</p>
      </div>

      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="w-fit">
            <div className="w-full flex justify-center items-center">
              <Link href={type}>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>View all</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
