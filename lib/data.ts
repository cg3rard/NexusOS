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
