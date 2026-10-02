"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDown, ArrowUp, Gauge, Zap, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { kpiMetrics, productionData, type KpiMetric } from "@/lib/data";

const statusStyles: Record<
  KpiMetric["status"],
  { dot: string; text: string; chip: string }
> = {
  optimal: {
    dot: "bg-status-optimal",
    text: "text-status-optimal",
    chip: "bg-status-optimal/10 text-status-optimal",
  },
  warning: {
    dot: "bg-status-warning",
    text: "text-status-warning",
    chip: "bg-status-warning/10 text-status-warning",
  },
  critical: {
    dot: "bg-status-critical",
    text: "text-status-critical",
    chip: "bg-status-critical/10 text-status-critical",
  },
};

const kpiIcons = {
  production: Gauge,
  energy: Zap,
  reliability: ShieldAlert,
};

function KpiCard({ metric }: { metric: KpiMetric }) {
  const styles = statusStyles[metric.status];
  const Icon = kpiIcons[metric.id as keyof typeof kpiIcons] ?? Gauge;
  const DeltaIcon = metric.deltaDirection === "up" ? ArrowUp : ArrowDown;

  return (
    <Card className="border-border shadow-card">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
            <CardTitle className="text-[13px] font-medium text-muted-foreground">
              {metric.label}
            </CardTitle>
          </div>
          <p className="mt-1 text-[12px] text-muted-foreground/70">
            {metric.description}
          </p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-secondary text-muted-foreground">
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </div>
      </CardHeader>
      <CardContent className="flex items-end justify-between pt-0">
        <div className="flex items-baseline gap-1">
          <span className="text-[28px] font-semibold tracking-tight text-foreground">
            {metric.value}
          </span>
          {metric.unit && (
            <span className="text-sm text-muted-foreground">{metric.unit}</span>
          )}
        </div>
        <span
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
            styles.chip
          )}
        >
          <DeltaIcon className="h-3 w-3" />
          {metric.delta}
        </span>
      </CardContent>
    </Card>
  );
}

function ProductionChart() {
  return (
    <Card className="col-span-full border-border shadow-card lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-[15px]">Production Output vs. Target</CardTitle>
          <p className="mt-0.5 text-[12.5px] text-muted-foreground">
            Real-time throughput, last 24 hours (bbl/hr)
          </p>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" /> Output
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-border" /> Target
          </span>
        </div>
      </CardHeader>
      <CardContent className="pl-0 pr-2">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={productionData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(211 100% 50%)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="hsl(211 100% 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="hsl(240 6% 92%)"
              strokeDasharray="3 6"
            />
            <XAxis
              dataKey="time"
              tick={{ fill: "hsl(240 5% 55%)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(240 5% 55%)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              domain={[700, 900]}
              width={40}
            />
            <Tooltip
              cursor={{ stroke: "hsl(211 100% 50%)", strokeWidth: 1 }}
              contentStyle={{
                background: "hsl(0 0% 100%)",
                border: "1px solid hsl(240 6% 90%)",
                borderRadius: "0.75rem",
                fontSize: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
              labelStyle={{ color: "hsl(240 10% 12%)" }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="hsl(240 6% 80%)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="output"
              stroke="hsl(211 100% 50%)"
              strokeWidth={2.25}
              fill="url(#outputGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "hsl(211 100% 50%)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CommandCenter() {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
          Executive Command Center
        </h2>
        <span className="text-[12px] text-muted-foreground">
          Updated moments ago
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {kpiMetrics.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ProductionChart />
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-[15px]">Shift Summary</CardTitle>
            <p className="mt-0.5 text-[12.5px] text-muted-foreground">
              Current operating shift
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-muted-foreground">Active Alarms</span>
              <span className="font-medium text-status-critical">3 Critical</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-muted-foreground">Open Work Orders</span>
              <span className="font-medium text-foreground">7</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-muted-foreground">Avg. Equipment Health</span>
              <span className="font-medium text-status-warning">72.6%</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-muted-foreground">Unplanned Downtime (24h)</span>
              <span className="font-medium text-foreground">1.4 hrs</span>
            </div>
            <div className="h-px bg-border" />
            <p className="text-[12.5px] leading-relaxed text-muted-foreground">
              AI Root Cause Engine has identified{" "}
              <span className="font-medium text-foreground">1 critical anomaly</span>{" "}
              requiring immediate maintenance attention.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
