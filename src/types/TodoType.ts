import { Priority } from "../constants/PriorityLevels";

export type TodoType = {
  id: string;
  text: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
};
