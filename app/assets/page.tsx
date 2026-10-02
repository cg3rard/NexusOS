"use client";

import {
  Fan,
  Gauge as GaugeIcon,
  Thermometer,
  Wind,
  Zap,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { equipmentAssets, type Equipment, type StatusLevel } from "@/lib/data";
import { cn } from "@/lib/utils";

const typeIcons: Record<Equipment["type"], React.ElementType> = {
  Pump: GaugeIcon,
  Compressor: Wind,
  Motor: Zap,
  "Heat Exchanger": Thermometer,
  Blower: Fan,
};

const statusBadge: Record<StatusLevel, { label: string; variant: "optimal" | "warning" | "critical" }> = {
  optimal: { label: "Optimal", variant: "optimal" },
  warning: { label: "Warning", variant: "warning" },
  critical: { label: "Critical", variant: "critical" },
};

const healthScoreColor = (score: number) => {
  if (score >= 85) return "text-status-optimal";
  if (score >= 60) return "text-status-warning";
  return "text-status-critical";
};

export default function AssetsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-[var(--sidebar-width)]">
        <DashboardHeader />
        <main className="flex flex-col gap-6 px-6 py-8 lg:px-10">
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                Plant Equipment
              </h2>
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                Critical assets across all process units
              </p>
            </div>
            <span className="text-[12px] text-muted-foreground">
              {equipmentAssets.length} assets tracked
            </span>
          </div>

          <Card className="border-border shadow-card">
            <CardHeader className="pb-0">
              <CardTitle className="text-[15px]">Critical Assets</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
                      <th className="px-4 py-3">Asset ID</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Unit Location</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Health Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipmentAssets.map((asset) => {
                      const Icon = typeIcons[asset.type];
                      const status = statusBadge[asset.status];
                      return (
                        <tr
                          key={asset.id}
                          className="border-b border-border/60 text-[13.5px] transition-colors last:border-b-0 hover:bg-foreground/[0.03]"
                        >
                          <td className="px-4 py-3.5 font-medium text-foreground">
                            {asset.tag}
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-secondary text-muted-foreground">
                                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                              </div>
                              <span className="text-foreground">{asset.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-muted-foreground">
                            {asset.area}
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <span className={cn("font-semibold", healthScoreColor(asset.healthScore))}>
                              {asset.healthScore}
                            </span>
                            <span className="text-muted-foreground">/100</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
