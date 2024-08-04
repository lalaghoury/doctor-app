"use client";

import { cn } from "@/lib/utils";
import { HamburgerMenuIcon, HomeIcon, BellIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface Props {
  role: string;
}

const SideNav = ({ role }: Props) => {
  let links = [
    {
      title: "Home",
      label: "",
      icon: HomeIcon,
      location: "/",
    },
  ];

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  role === "doctor" &&
    links.push({
      title: "New Requests",
      location: "",
      icon: BellIcon,
      label: "",
    });

  if (role === "admin") {
    links = [
      ...links,
      {
        title: "Pending approvals",
        location: "",
        icon: BellIcon,
        label: "",
      },
      {
        title: "Cancelled approvals",
        location: "",
        icon: BellIcon,
        label: "",
      },
      {
        title: "Veified approvals",
        location: "",
        icon: BellIcon,
        label: "",
      },
    ];
  }

  return (
    <aside
      className={cn(
        "pt-5",
        isCollapsed ? "items-center w-16" : "items-start w-1/6"
      )}
    >
      <Card className={cn("h-full flex flex-col gap-4 p-5 justify-start")}>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <HamburgerMenuIcon
                className="h-6 w-6 cursor-pointer mb-5 hover:text-foreground/50"
                onClick={() => setIsCollapsed(!isCollapsed)}
              />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-popover text-sm text-popover-foreground p-2"
            >
              Collapse
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.location}
                    className="flex items-center gap-2 hover:text-foreground/50"
                  >
                    <link.icon className="h-6 w-6" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4 bg-popover text-sm text-popover-foreground p-2"
                >
                  {link.title}
                  {link.label && <span className="ml-auto">{link.label}</span>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href={link.location}
              className="flex items-center gap-2 hover:text-foreground/50 border p-1 rounded-lg"
            >
              <link.icon className="mr-2 h-6 w-6" />
              <span className="font-normal">{link.title}</span>
            </Link>
          )
        )}
      </Card>
    </aside>
  );
};

export default SideNav;
