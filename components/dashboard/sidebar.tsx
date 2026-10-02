"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Gauge,
  LayoutGrid,
  LineChart,
  Settings,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", icon: LayoutGrid, href: "/" },
  { label: "Assets", icon: Boxes, href: "/assets" },
  { label: "Analytics", icon: LineChart, href: "/analytics" },
  { label: "Maintenance", icon: Wrench, href: "/maintenance" },
  { label: "Performance", icon: Gauge, href: "/performance" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[var(--sidebar-width)] flex-col border-r border-border bg-white/80 px-4 py-6 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-2.5 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-foreground text-background">
          <span className="text-sm font-semibold">N</span>
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          NexusOS
        </span>
      </div>

      <nav className="mt-8 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-[10px] px-3 py-2 text-left text-[13.5px] font-medium transition-colors",
                isActive
                  ? "bg-foreground/[0.06] text-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
              )}
            >
              <item.icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-border pt-6">
        <p className="px-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
          Sites
        </p>
        <div className="mt-2 flex flex-col gap-0.5">
          <button className="flex items-center gap-3 rounded-[10px] bg-foreground/[0.04] px-3 py-2 text-left text-[13.5px] font-medium text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-status-optimal" />
            Gulf Coast Complex
          </button>
          <button className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-left text-[13.5px] font-medium text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-border" />
            Baytown Facility
          </button>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4">
        <button className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-left text-[13.5px] font-medium text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground">
          <Settings className="h-[17px] w-[17px]" strokeWidth={1.8} />
          Settings
        </button>
        <div className="mt-2 flex items-center gap-2.5 px-3 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/[0.08] text-[11px] font-semibold text-foreground">
            OP
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-medium text-foreground">Plant Operator</p>
            <p className="text-[11px] text-muted-foreground">Shift A</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
