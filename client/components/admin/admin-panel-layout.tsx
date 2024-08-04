"use client";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/admin/footer";
import { Sidebar } from "@/components/admin/sidebar";
import { useSidebarToggle } from "@/lib/features/sidebar/sidebarSlice";
import { useAppSelector } from "@/lib/hooks";
import { Navbar } from "../Navbar/Navbar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useSidebarToggle();
  const {
    user: { role },
    isLoggedIn,
  }: any = useAppSelector((state) => state.auth);

  if (!sidebar) return null;

  if (!isLoggedIn)
    return (
      <main>
        <Navbar />
        {children}
      </main>
    );

  if (role !== "admin") return <main>{children}</main>;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
