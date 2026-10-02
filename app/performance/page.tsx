"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDown, ArrowUp, Gauge, Timer, Zap } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  performanceSummaryMetrics,
  oeeByUnitData,
  mtbfTrendData,
  energyEfficiencyByUnitData,
  type PerformanceSummaryMetric,
} from "@/lib/data";

const statusStyles: Record<
  PerformanceSummaryMetric["status"],
  { dot: string; chip: string }
> = {
  optimal: { dot: "bg-status-optimal", chip: "bg-status-optimal/10 text-status-optimal" },
  warning: { dot: "bg-status-warning", chip: "bg-status-warning/10 text-status-warning" },
  critical: { dot: "bg-status-critical", chip: "bg-status-critical/10 text-status-critical" },
};

const metricIcons: Record<string, React.ElementType> = {
  oee: Gauge,
  mtbf: Timer,
  energyIndex: Zap,
};

const tooltipStyle = {
  background: "hsl(0 0% 100%)",
  border: "1px solid hsl(240 6% 90%)",
  borderRadius: "0.75rem",
  fontSize: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

const axisTick = { fill: "hsl(240 5% 55%)", fontSize: 11 };

function MetricCard({ metric }: { metric: PerformanceSummaryMetric }) {
  const styles = statusStyles[metric.status];
  const Icon = metricIcons[metric.id] ?? Gauge;
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
          <p className="mt-1 text-[12px] text-muted-foreground/70">{metric.description}</p>
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
          {metric.unit && <span className="text-sm text-muted-foreground">{metric.unit}</span>}
        </div>
        <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", styles.chip)}>
          <DeltaIcon className="h-3 w-3" />
          {metric.delta}
        </span>
      </CardContent>
    </Card>
  );
}

function OeeByUnitCard() {
  return (
    <Card className="border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-[15px]">OEE by Unit</CardTitle>
        <p className="mt-0.5 text-[12.5px] text-muted-foreground">
          Overall Equipment Effectiveness, current period (%)
        </p>
      </CardHeader>
      <CardContent className="pl-0 pr-2">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={oeeByUnitData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(240 6% 92%)" strokeDasharray="3 6" />
            <XAxis dataKey="unit" tick={axisTick} tickLine={false} axisLine={false} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} width={32} domain={[0, 100]} />
            <Tooltip cursor={{ fill: "hsl(240 6% 95%)" }} contentStyle={tooltipStyle} labelStyle={{ color: "hsl(240 10% 12%)" }} />
            <Bar dataKey="oee" fill="hsl(211 100% 50%)" radius={[6, 6, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function MtbfTrendCard() {
  return (
    <Card className="border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-[15px]">MTBF Trend</CardTitle>
        <p className="mt-0.5 text-[12.5px] text-muted-foreground">
          Mean time between failures, year to date (hrs)
        </p>
      </CardHeader>
      <CardContent className="pl-0 pr-2">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={mtbfTrendData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(240 6% 92%)" strokeDasharray="3 6" />
            <XAxis dataKey="month" tick={axisTick} tickLine={false} axisLine={false} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} width={36} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(240 10% 12%)" }} />
            <Line
              type="monotone"
              dataKey="mtbf"
              stroke="hsl(142 71% 45%)"
              strokeWidth={2.25}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(142 71% 45%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function EnergyEfficiencyCard() {
  return (
    <Card className="col-span-full border-border shadow-card lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-[15px]">Energy Efficiency Index by Unit</CardTitle>
        <p className="mt-0.5 text-[12.5px] text-muted-foreground">
          Actual vs. benchmarked energy use per unit output (1.0 = benchmark)
        </p>
      </CardHeader>
      <CardContent className="pl-0 pr-2">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={energyEfficiencyByUnitData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(240 6% 92%)" strokeDasharray="3 6" />
            <XAxis dataKey="unit" tick={axisTick} tickLine={false} axisLine={false} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} width={32} domain={[0, 1.2]} />
            <Tooltip cursor={{ fill: "hsl(240 6% 95%)" }} contentStyle={tooltipStyle} labelStyle={{ color: "hsl(240 10% 12%)" }} />
            <Bar dataKey="index" fill="hsl(36 100% 50%)" radius={[6, 6, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function PerformancePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-[var(--sidebar-width)]">
        <DashboardHeader />
        <main className="flex flex-col gap-6 px-6 py-8 lg:px-10">
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                System &amp; Equipment Performance
              </h2>
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                OEE, reliability, and energy efficiency across plant units
              </p>
            </div>
            <span className="text-[12px] text-muted-foreground">Updated moments ago</span>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {performanceSummaryMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <OeeByUnitCard />
            <MtbfTrendCard />
            <EnergyEfficiencyCard />
          </div>
        </main>
      </div>
    </div>
  );
}
