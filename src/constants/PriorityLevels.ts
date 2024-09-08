export const PRIORITY_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export type Priority = (typeof PRIORITY_LEVELS)[keyof typeof PRIORITY_LEVELS];
