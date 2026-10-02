"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Fan,
  Gauge as GaugeIcon,
  Thermometer,
  Wind,
  Zap,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { equipmentAssets, type Equipment, type StatusLevel } from "@/lib/data";

const typeIcons: Record<Equipment["type"], React.ElementType> = {
  Pump: GaugeIcon,
  Compressor: Wind,
  Motor: Zap,
  "Heat Exchanger": Thermometer,
  Blower: Fan,
};

const statusConfig: Record<
  StatusLevel,
  {
    label: string;
    badge: "optimal" | "warning" | "critical";
    ring: string;
    dot: string;
    progress: string;
    iconText: string;
  }
> = {
  optimal: {
    label: "Optimal",
    badge: "optimal",
    ring: "border-border hover:border-status-optimal/40",
    dot: "bg-status-optimal",
    progress: "bg-status-optimal",
    iconText: "text-muted-foreground",
  },
  warning: {
    label: "Warning",
    badge: "warning",
    ring: "border-border hover:border-status-warning/40",
    dot: "bg-status-warning",
    progress: "bg-status-warning",
    iconText: "text-muted-foreground",
  },
  critical: {
    label: "Critical",
    badge: "critical",
    ring: "border-status-critical/30 hover:border-status-critical/50",
    dot: "bg-status-critical",
    progress: "bg-status-critical",
    iconText: "text-status-critical",
  },
};

function EquipmentCard({
  asset,
  onOpen,
}: {
  asset: Equipment;
  onOpen: (asset: Equipment) => void;
}) {
  const config = statusConfig[asset.status];
  const Icon = typeIcons[asset.type];
  const isCritical = asset.status === "critical";

  return (
    <button
      onClick={() => onOpen(asset)}
      className={cn(
        "group relative flex flex-col rounded-2xl border bg-card p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        config.ring
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-[10px] bg-secondary",
            config.iconText
          )}
        >
          <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
        </div>
        <Badge variant={config.badge}>{config.label}</Badge>
      </div>
      <div className="mt-4">
        <p className="font-mono text-[15px] font-semibold tracking-tight text-foreground">
          {asset.tag}
        </p>
        <p className="text-[13px] text-muted-foreground">{asset.name}</p>
        <p className="mt-0.5 text-[11.5px] text-muted-foreground/70">{asset.area}</p>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-muted-foreground">{asset.metricLabel}</span>
          <span
            className={cn(
              "font-medium",
              isCritical ? "text-status-critical" : "text-foreground"
            )}
          >
            {asset.metricValue}
          </span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-muted-foreground">Health Score</span>
          <span className="font-medium text-foreground">{asset.healthScore}%</span>
        </div>
        <Progress
          value={asset.healthScore}
          className="h-1.5"
          indicatorClassName={config.progress}
        />
      </div>
      {isCritical && (
        <div className="mt-4 flex items-center gap-1.5 rounded-[10px] bg-status-critical/[0.06] px-2.5 py-1.5 text-[11.5px] font-medium text-status-critical">
          <Sparkles className="h-3.5 w-3.5" />
          AI diagnosis available
        </div>
      )}
    </button>
  );
}

function DiagnosisModal({
  asset,
  open,
  onOpenChange,
  onGenerateTicket,
}: {
  asset: Equipment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateTicket: (asset: Equipment) => void;
}) {
  if (!asset) return null;
  const diagnosis = asset.diagnosis;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border-white/20 bg-card/90 shadow-glass backdrop-blur-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-status-critical/10 text-status-critical">
              <AlertTriangle className="h-4.5 w-4.5" strokeWidth={1.8} />
            </div>
            <div>
              <DialogTitle className="text-[15px]">
                AI Root Cause Analysis — Asset {asset.tag}
              </DialogTitle>
              <DialogDescription className="text-[12.5px]">
                {asset.name} · {asset.area}
              </DialogDescription>
            </div>
            <Badge variant="critical" className="ml-auto">
              Critical
            </Badge>
          </div>
        </DialogHeader>

        {diagnosis && (
          <div className="space-y-3">
            <div className="rounded-[14px] border border-border bg-secondary/50 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-status-critical">
                <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.8} />
                Anomaly Detected
              </p>
              <p className="mt-1.5 text-[13.5px] text-foreground/90">
                High Radial Vibration (7.8 mm/s) &amp; High dP.
              </p>
            </div>

            <div className="rounded-[14px] border border-primary/15 bg-primary/[0.04] p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
                Historical Match
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-primary">
                  {diagnosis.probability}%
                </span>
                <span className="text-[13.5px] text-foreground/90">
                  probability matching incident record from{" "}
                  <span className="font-medium">
                    &ldquo;RCA1 - PU-2101B Mechanical Seal Leakage&rdquo;
                  </span>
                </span>
              </div>
              <Progress
                value={diagnosis.probability}
                className="mt-3 h-1.5"
                indicatorClassName="bg-primary"
              />
            </div>

            <div className="rounded-[14px] border border-border bg-secondary/30 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <ClipboardCheck className="h-3.5 w-3.5" strokeWidth={1.8} />
                Recommended Action
              </p>
              <p className="mt-1.5 text-[13.5px] text-foreground/90">
                Inspect and replace Mechanical Seal, check alignment and lubrication.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Dismiss
          </Button>
          <Button className="gap-1.5" onClick={() => onGenerateTicket(asset)}>
            <ClipboardCheck className="h-4 w-4" />
            Generate &amp; Assign Action Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ProblemTank({
  onGenerateTicket,
}: {
  onGenerateTicket: (asset: Equipment) => void;
}) {
  const [selected, setSelected] = useState<Equipment | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (asset: Equipment) => {
    setSelected(asset);
    setOpen(true);
  };

  const handleGenerateTicket = (asset: Equipment) => {
    setOpen(false);
    onGenerateTicket(asset);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
            AI Root Cause Engine
          </h2>
          <Badge variant="outline" className="text-muted-foreground">
            Problem Tank
          </Badge>
        </div>
        <span className="text-[12px] text-muted-foreground">
          5 critical assets monitored
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {equipmentAssets.map((asset) => (
          <EquipmentCard key={asset.id} asset={asset} onOpen={handleOpen} />
        ))}
      </div>
      <DiagnosisModal
        asset={selected}
        open={open}
        onOpenChange={setOpen}
        onGenerateTicket={handleGenerateTicket}
      />
    </section>
  );
}
