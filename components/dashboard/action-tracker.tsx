"use client";

import { CalendarClock, Sparkles, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Ticket, type TicketStatus } from "@/lib/data";

const columns: { status: TicketStatus; accent: string }[] = [
  { status: "To Do", accent: "bg-muted-foreground/50" },
  { status: "In Progress", accent: "bg-status-warning" },
  { status: "Done", accent: "bg-status-optimal" },
];

const priorityBadge: Record<Ticket["priority"], "critical" | "warning" | "secondary"> = {
  High: "critical",
  Medium: "warning",
  Low: "secondary",
};

function TicketCard({
  ticket,
  isNew,
}: {
  ticket: Ticket;
  isNew?: boolean;
}) {
  const isAiGenerated = ticket.source === "AI Generated";
  return (
    <div
      className={cn(
        "rounded-[14px] border p-4 transition-all duration-500",
        isNew
          ? "border-status-optimal/40 bg-status-optimal/[0.06] shadow-[0_0_0_3px_hsla(142,71%,45%,0.12)] animate-in fade-in slide-in-from-top-2"
          : "border-border bg-card hover:bg-secondary/40"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground">
          {ticket.id}
        </span>
        <div className="flex items-center gap-1.5">
          {isNew && (
            <Badge variant="optimal" className="animate-pulse">
              New
            </Badge>
          )}
          <Badge variant={priorityBadge[ticket.priority]}>
            {ticket.priority}
          </Badge>
        </div>
      </div>

      <p className="mt-2 text-[13.5px] font-medium leading-snug text-foreground">
        {ticket.title}
      </p>
      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
        {ticket.description}
      </p>

      <div className="mt-3 flex items-center gap-1.5">
        <span className="rounded-[6px] bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
          {ticket.asset}
        </span>
        {isAiGenerated && (
          <span className="flex items-center gap-1 rounded-[6px] bg-primary/[0.08] px-1.5 py-0.5 text-[11px] font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            AI Generated
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11.5px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" strokeWidth={1.8} />
          {ticket.assignee}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarClock className="h-3.5 w-3.5" strokeWidth={1.8} />
          {ticket.createdAt}
        </span>
      </div>
    </div>
  );
}

export function ActionTracker({
  tickets,
  highlightTicketId,
}: {
  tickets: Ticket[];
  highlightTicketId?: string | null;
}) {
  return (
    <section id="action-tracker" className="space-y-4 scroll-mt-24">
      <div className="flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
            Smart Action Tracker
          </h2>
          <Badge variant="outline" className="text-muted-foreground">
            Maintenance Workflow
          </Badge>
        </div>
        <span className="text-[12px] text-muted-foreground">
          {tickets.length} active tickets
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {columns.map((col) => {
          const items = tickets.filter((t) => t.status === col.status);
          return (
            <Card key={col.status} className="border-border bg-secondary/20 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-[13.5px] font-semibold">
                  <span className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", col.accent)} />
                    {col.status}
                  </span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
                    {items.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {items.length === 0 ? (
                  <p className="py-6 text-center text-[12px] text-muted-foreground">
                    No tickets in this stage.
                  </p>
                ) : (
                  items.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      isNew={ticket.id === highlightTicketId}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
