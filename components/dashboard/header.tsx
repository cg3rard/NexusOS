"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6 lg:px-10">
        <div>
          <h1 className="text-[17px] font-semibold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="text-[12.5px] text-muted-foreground">
            Gulf Coast Refinery &amp; Petrochemical Complex
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets, tickets…"
              aria-label="Search assets, tickets"
              className="h-9 w-56 rounded-[10px] border border-border bg-secondary/60 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground">
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-status-critical" />
          </Button>
        </div>
      </div>
    </header>
  );
}
