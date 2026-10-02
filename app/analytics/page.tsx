"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart as RLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  monthlyEnergyData,
  equipmentDowntimeData,
  predictionAccuracyData,
} from "@/lib/data";

const tooltipStyle = {
  background: "hsl(0 0% 100%)",
  border: "1px solid hsl(240 6% 90%)",
  borderRadius: "0.75rem",
  fontSize: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

const axisTick = { fill: "hsl(240 5% 55%)", fontSize: 11 };

function EnergyTrendCard() {
  return (
    <Card className="border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-[15px]">Monthly Energy Consumption Trend</CardTitle>
        <p className="mt-0.5 text-[12.5px] text-muted-foreground">
          Plant-wide draw, year to date (MWh)
        </p>
      </CardHeader>
      <CardContent className="pl-0 pr-2">
        <ResponsiveContainer width="100%" height={240}>
          <RLineChart data={monthlyEnergyData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(240 6% 92%)" strokeDasharray="3 6" />
            <XAxis dataKey="month" tick={axisTick} tickLine={false} axisLine={false} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} width={36} />
            <Tooltip
              cursor={{ stroke: "hsl(211 100% 50%)", strokeWidth: 1 }}
              contentStyle={tooltipStyle}
              labelStyle={{ color: "hsl(240 10% 12%)" }}
            />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="hsl(211 100% 50%)"
              strokeWidth={2.25}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(211 100% 50%)" }}
            />
          </RLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function DowntimeCard() {
  return (
    <Card className="border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-[15px]">Equipment Downtime Hours</CardTitle>
        <p className="mt-0.5 text-[12.5px] text-muted-foreground">
          Unplanned downtime, year to date (hrs)
        </p>
      </CardHeader>
      <CardContent className="pl-0 pr-2">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={equipmentDowntimeData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(240 6% 92%)" strokeDasharray="3 6" />
            <XAxis dataKey="month" tick={axisTick} tickLine={false} axisLine={false} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} width={32} />
            <Tooltip cursor={{ fill: "hsl(240 6% 95%)" }} contentStyle={tooltipStyle} labelStyle={{ color: "hsl(240 10% 12%)" }} />
            <Bar dataKey="hours" fill="hsl(36 100% 50%)" radius={[6, 6, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function PredictionAccuracyCard() {
  return (
    <Card className="col-span-full border-border shadow-card lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-[15px]">Prediction Accuracy vs. Actual Failures</CardTitle>
          <p className="mt-0.5 text-[12.5px] text-muted-foreground">
            AI-predicted vs. observed equipment failures per month
          </p>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" /> Predicted
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-status-critical" /> Actual
          </span>
        </div>
      </CardHeader>
      <CardContent className="pl-0 pr-2">
        <ResponsiveContainer width="100%" height={260}>
          <RLineChart data={predictionAccuracyData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(240 6% 92%)" strokeDasharray="3 6" />
            <XAxis dataKey="month" tick={axisTick} tickLine={false} axisLine={false} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} width={32} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(240 10% 12%)" }} />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="hsl(211 100% 50%)"
              strokeWidth={2.25}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(4 90% 58%)"
              strokeWidth={2.25}
              dot={{ r: 3 }}
            />
          </RLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-[var(--sidebar-width)]">
        <DashboardHeader />
        <main className="flex flex-col gap-6 px-6 py-8 lg:px-10">
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                Analytics &amp; Reporting
              </h2>
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                Plant-wide performance metrics and trends
              </p>
            </div>
            <span className="text-[12px] text-muted-foreground">Updated moments ago</span>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <EnergyTrendCard />
            <DowntimeCard />
            <PredictionAccuracyCard />
          </div>
        </main>
      </div>
    </div>
  );
}
