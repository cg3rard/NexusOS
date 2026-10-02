"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { CommandCenter } from "@/components/dashboard/command-center";
import { ProblemTank } from "@/components/dashboard/problem-tank";
import { ActionTracker } from "@/components/dashboard/action-tracker";
import { ToastProvider, useToast } from "@/components/ui/toast";
import {
  tickets as initialTickets,
  createTicketFromDiagnosis,
  type Equipment,
  type Ticket,
} from "@/lib/data";

function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [highlightTicketId, setHighlightTicketId] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleGenerateTicket = (asset: Equipment) => {
    const newTicket = createTicketFromDiagnosis(asset);

    // Insert the new ticket at the top of the list so it's immediately visible.
    setTickets((prev) => [newTicket, ...prev]);
    setHighlightTicketId(newTicket.id);

    // Scroll to the Smart Action Tracker section to reveal the new ticket.
    requestAnimationFrame(() => {
      document
        .getElementById("action-tracker")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    showToast({
      title: "Action ticket successfully created and dispatched.",
      description: `${newTicket.id} assigned to ${newTicket.assignee}`,
      variant: "success",
    });

    // Remove the "new" highlight after the entrance animation has had time to play.
    window.setTimeout(() => setHighlightTicketId(null), 3000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-[var(--sidebar-width)]">
        <DashboardHeader />
        <main className="flex flex-col gap-10 px-6 py-8 lg:px-10">
          <CommandCenter />
          <ProblemTank onGenerateTicket={handleGenerateTicket} />
          <ActionTracker tickets={tickets} highlightTicketId={highlightTicketId} />
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <Dashboard />
    </ToastProvider>
  );
}
