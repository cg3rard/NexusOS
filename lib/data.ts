// Centralized dummy data for the NexusOS Intelligent Manufacturing Dashboard.
// All data below is hardcoded for prototype/demo purposes only.

export type StatusLevel = "optimal" | "warning" | "critical";

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  delta: string;
  deltaDirection: "up" | "down";
  status: StatusLevel;
  description: string;
}

export const kpiMetrics: KpiMetric[] = [
  {
    id: "production",
    label: "Total Production",
    value: "94.2",
    unit: "%",
    delta: "+2.1% vs target",
    deltaDirection: "up",
    status: "optimal",
    description: "Plant-wide throughput vs. nameplate capacity",
  },
  {
    id: "energy",
    label: "Energy Consumption",
    value: "118.6",
    unit: "MWh",
    delta: "+8.4% vs baseline",
    deltaDirection: "up",
    status: "warning",
    description: "Aggregate energy draw across process units",
  },
  {
    id: "reliability",
    label: "Equipment Reliability",
    value: "76.3",
    unit: "%",
    delta: "-5.8% this week",
    deltaDirection: "down",
    status: "critical",
    description: "Mechanical availability across critical assets",
  },
];

export interface ProductionPoint {
  time: string;
  output: number;
  target: number;
}

export const productionData: ProductionPoint[] = [
  { time: "00:00", output: 820, target: 850 },
  { time: "02:00", output: 834, target: 850 },
  { time: "04:00", output: 812, target: 850 },
  { time: "06:00", output: 845, target: 850 },
  { time: "08:00", output: 861, target: 850 },
  { time: "10:00", output: 879, target: 850 },
  { time: "12:00", output: 858, target: 850 },
  { time: "14:00", output: 842, target: 850 },
  { time: "16:00", output: 795, target: 850 },
  { time: "18:00", output: 771, target: 850 },
  { time: "20:00", output: 805, target: 850 },
  { time: "22:00", output: 831, target: 850 },
];

export type EquipmentType = "Pump" | "Compressor" | "Motor" | "Heat Exchanger" | "Blower";

export interface AiDiagnosis {
  anomaly: string;
  rootCause: string;
  probability: number;
  recommendation: string;
  historicalBasis: string;
}

export interface Equipment {
  id: string;
  tag: string;
  name: string;
  type: EquipmentType;
  area: string;
  status: StatusLevel;
  healthScore: number;
  metricLabel: string;
  metricValue: string;
  diagnosis?: AiDiagnosis;
}

export const equipmentAssets: Equipment[] = [
  {
    id: "pu-2101b",
    tag: "PU-2101B",
    name: "Feed Charge Pump B",
    type: "Pump",
    area: "Unit 200 - Crude Feed",
    status: "critical",
    healthScore: 42,
    metricLabel: "Radial Vibration",
    metricValue: "7.8 mm/s",
    diagnosis: {
      anomaly: "High Radial Vibration and elevated differential pressure (dP)",
      rootCause: "Mechanical Seal Leakage",
      probability: 85,
      recommendation:
        "Inspect and replace mechanical seal on PU-2101B. Schedule under controlled shutdown to avoid unplanned trip.",
      historicalBasis:
        "Pattern matches 11 of 13 prior seal-failure events in the RCA knowledge base for this pump class.",
    },
  },
  {
    id: "ko-3201",
    tag: "KO-3201",
    name: "Recycle Gas Compressor",
    type: "Compressor",
    area: "Unit 300 - Hydrotreater",
    status: "warning",
    healthScore: 71,
    metricLabel: "Discharge Temp",
    metricValue: "118.4 °C",
  },
  {
    id: "pm-4405b",
    tag: "PM-4405B",
    name: "Cooling Fan Motor B",
    type: "Motor",
    area: "Unit 400 - Utilities",
    status: "optimal",
    healthScore: 94,
    metricLabel: "Winding Temp",
    metricValue: "62.1 °C",
  },
  {
    id: "he-3301",
    tag: "HE-3301",
    name: "Feed/Effluent Exchanger",
    type: "Heat Exchanger",
    area: "Unit 300 - Hydrotreater",
    status: "optimal",
    healthScore: 88,
    metricLabel: "Fouling Factor",
    metricValue: "0.0021",
  },
  {
    id: "bl-5702",
    tag: "BL-5702",
    name: "Combustion Air Blower",
    type: "Blower",
    area: "Unit 500 - Furnace",
    status: "warning",
    healthScore: 68,
    metricLabel: "Bearing Temp",
    metricValue: "79.6 °C",
  },
];

export type TicketPriority = "Low" | "Medium" | "High";
export type TicketStatus = "To Do" | "In Progress" | "Done";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  asset: string;
  assignee: string;
  team: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  source: "AI Generated" | "Manual";
}

export const tickets: Ticket[] = [
  {
    id: "TCK-10492",
    title: "Inspect and replace Mechanical Seal on PU-2101B",
    description:
      "AI Root Cause Engine flagged 85% probability of mechanical seal leakage based on vibration and dP anomaly.",
    asset: "PU-2101B",
    assignee: "Maintenance Team",
    team: "Rotating Equipment",
    priority: "High",
    status: "To Do",
    createdAt: "Auto-generated 12 min ago",
    source: "AI Generated",
  },
  {
    id: "TCK-10488",
    title: "Verify discharge temperature trend on KO-3201",
    description:
      "Discharge temperature trending upward over 6 hours; confirm anti-surge valve calibration.",
    asset: "KO-3201",
    assignee: "J. Alvarez",
    team: "Process Engineering",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2 hours ago",
    source: "Manual",
  },
  {
    id: "TCK-10475",
    title: "Lubrication check on BL-5702 bearing housing",
    description: "Bearing temperature approaching warning threshold; routine lubrication check requested.",
    asset: "BL-5702",
    assignee: "Maintenance Team",
    team: "Rotating Equipment",
    priority: "Medium",
    status: "To Do",
    createdAt: "5 hours ago",
    source: "AI Generated",
  },
  {
    id: "TCK-10460",
    title: "Quarterly fouling assessment on HE-3301",
    description: "Routine quarterly exchanger performance review and cleaning assessment.",
    asset: "HE-3301",
    assignee: "R. Chen",
    team: "Process Engineering",
    priority: "Low",
    status: "Done",
    createdAt: "1 day ago",
    source: "Manual",
  },
];

let ticketSequence = 10493;

export function createTicketFromDiagnosis(asset: Equipment): Ticket {
  ticketSequence += 1;
  return {
    id: `TCK-${ticketSequence}`,
    title: `Replace Mechanical Seal on ${asset.tag}`,
    description:
      asset.diagnosis?.recommendation ??
      `Inspect and remediate anomaly detected on ${asset.tag}.`,
    asset: asset.tag,
    assignee: "Maintenance Team Alpha",
    team: "Rotating Equipment",
    priority: "High",
    status: "In Progress",
    createdAt: "Just now",
    source: "AI Generated",
  };
}


export interface MonthlyEnergyPoint {
  month: string;
  consumption: number;
}

export const monthlyEnergyData: MonthlyEnergyPoint[] = [
  { month: "Jan", consumption: 102.4 },
  { month: "Feb", consumption: 98.7 },
  { month: "Mar", consumption: 108.3 },
  { month: "Apr", consumption: 111.6 },
  { month: "May", consumption: 115.9 },
  { month: "Jun", consumption: 121.2 },
  { month: "Jul", consumption: 126.8 },
  { month: "Aug", consumption: 123.5 },
  { month: "Sep", consumption: 119.1 },
  { month: "Oct", consumption: 118.6 },
];

export interface DowntimePoint {
  month: string;
  hours: number;
}

export const equipmentDowntimeData: DowntimePoint[] = [
  { month: "Jan", hours: 3.2 },
  { month: "Feb", hours: 2.1 },
  { month: "Mar", hours: 4.6 },
  { month: "Apr", hours: 1.8 },
  { month: "May", hours: 2.9 },
  { month: "Jun", hours: 5.3 },
  { month: "Jul", hours: 3.7 },
  { month: "Aug", hours: 2.4 },
  { month: "Sep", hours: 1.6 },
  { month: "Oct", hours: 1.4 },
];

export interface PredictionAccuracyPoint {
  month: string;
  predicted: number;
  actual: number;
}

export const predictionAccuracyData: PredictionAccuracyPoint[] = [
  { month: "Jan", predicted: 4, actual: 5 },
  { month: "Feb", predicted: 3, actual: 3 },
  { month: "Mar", predicted: 6, actual: 7 },
  { month: "Apr", predicted: 2, actual: 2 },
  { month: "May", predicted: 5, actual: 4 },
  { month: "Jun", predicted: 7, actual: 8 },
  { month: "Jul", predicted: 4, actual: 5 },
  { month: "Aug", predicted: 3, actual: 3 },
  { month: "Sep", predicted: 2, actual: 2 },
  { month: "Oct", predicted: 3, actual: 3 },
];


export interface PerformanceSummaryMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  delta: string;
  deltaDirection: "up" | "down";
  status: StatusLevel;
  description: string;
}

export const performanceSummaryMetrics: PerformanceSummaryMetric[] = [
  {
    id: "oee",
    label: "Overall Equipment Effectiveness",
    value: "81.4",
    unit: "%",
    delta: "+1.6% vs last month",
    deltaDirection: "up",
    status: "optimal",
    description: "Availability × Performance × Quality, plant-wide",
  },
  {
    id: "mtbf",
    label: "Mean Time Between Failures",
    value: "412",
    unit: "hrs",
    delta: "-18 hrs vs last month",
    deltaDirection: "down",
    status: "warning",
    description: "Average operating time between failures, critical assets",
  },
  {
    id: "energyIndex",
    label: "Energy Efficiency Index",
    value: "0.92",
    delta: "+0.03 vs baseline",
    deltaDirection: "up",
    status: "optimal",
    description: "Actual vs. benchmarked energy use per unit output",
  },
];

export interface UnitOeePoint {
  unit: string;
  oee: number;
}

export const oeeByUnitData: UnitOeePoint[] = [
  { unit: "Unit 200", oee: 84.2 },
  { unit: "Unit 300", oee: 76.8 },
  { unit: "Unit 400", oee: 88.5 },
  { unit: "Unit 500", oee: 79.1 },
];

export interface MtbfTrendPoint {
  month: string;
  mtbf: number;
}

export const mtbfTrendData: MtbfTrendPoint[] = [
  { month: "Jan", mtbf: 398 },
  { month: "Feb", mtbf: 405 },
  { month: "Mar", mtbf: 372 },
  { month: "Apr", mtbf: 418 },
  { month: "May", mtbf: 441 },
  { month: "Jun", mtbf: 429 },
  { month: "Jul", mtbf: 406 },
  { month: "Aug", mtbf: 437 },
  { month: "Sep", mtbf: 430 },
  { month: "Oct", mtbf: 412 },
];

export interface EnergyEfficiencyPoint {
  unit: string;
  index: number;
}

export const energyEfficiencyByUnitData: EnergyEfficiencyPoint[] = [
  { unit: "Unit 200", index: 0.95 },
  { unit: "Unit 300", index: 0.88 },
  { unit: "Unit 400", index: 0.97 },
  { unit: "Unit 500", index: 0.9 },
];
