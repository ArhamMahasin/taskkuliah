export type TaskStatus = "Belum Selesai" | "Selesai";

export type TaskPriority = "Rendah" | "Sedang" | "Tinggi";

export interface Task {
  id: number;
  title: string;
  subject: string;
  description: string;
  deadline: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
}

export interface AppStatistics {
  total: number;
  completed: number;
  pending: number;
}

export interface AppConfig {
  name: string;
  version: string;
}

export type TaskFilter = TaskStatus | "Semua";
