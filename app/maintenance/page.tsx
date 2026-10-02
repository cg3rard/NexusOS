"use client";

import { ClipboardList } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { ActionTracker } from "@/components/dashboard/action-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tickets } from "@/lib/data";
import type { Ticket } from "@/lib/data";

const priorityBadge: Record<Ticket["priority"], "critical" | "warning" | "secondary"> = {
  High: "critical",
  Medium: "warning",
  Low: "secondary",
};

const statusBadge: Record<Ticket["status"], "critical" | "warning" | "optimal"> = {
  "To Do": "critical",
  "In Progress": "warning",
  Done: "optimal",
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-[var(--sidebar-width)]">
        <DashboardHeader />
        <main className="flex flex-col gap-10 px-6 py-8 lg:px-10">
          <section className="space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                  Maintenance Work Orders
                </h2>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                  Active work orders across all maintenance teams
                </p>
              </div>
              <span className="text-[12px] text-muted-foreground">
                {tickets.length} work orders
              </span>
            </div>

            <Card className="border-border shadow-card">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-2 text-[15px]">
                  <ClipboardList className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
                  Active Work Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-border text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
                        <th className="px-4 py-3">Work Order</th>
                        <th className="px-4 py-3">Asset</th>
                        <th className="px-4 py-3">Assigned Team</th>
                        <th className="px-4 py-3">Priority</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr
                          key={ticket.id}
                          className="border-b border-border/60 text-[13.5px] transition-colors last:border-b-0 hover:bg-foreground/[0.03]"
                        >
                          <td className="px-4 py-3.5">
                            <span className="font-mono text-[12px] text-muted-foreground">
                              {ticket.id}
                            </span>
                            <p className="mt-0.5 font-medium text-foreground">{ticket.title}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="rounded-[6px] bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                              {ticket.asset}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-muted-foreground">{ticket.team}</td>
                          <td className="px-4 py-3.5">
                            <Badge variant={priorityBadge[ticket.priority]}>
                              {ticket.priority}
                            </Badge>
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge variant={statusBadge[ticket.status]}>{ticket.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <ActionTracker tickets={tickets} />
        </main>
      </div>
    </div>
  );
}
