import { Navbar } from "@/components/Navbar/Navbar";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
