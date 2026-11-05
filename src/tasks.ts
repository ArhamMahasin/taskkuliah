import type { Task, TaskStatus } from "./types";
import { getStorage, setStorage } from "./storage";

const STORAGE_KEY = "tasks";

// Mengambil seluruh daftar tugas
export function getTasks(): Task[] {
  return getStorage<Task[]>(STORAGE_KEY, []);
}

// Menambahkan tugas baru
export function addTask(
  taskData: Omit<Task, "id" | "status" | "createdAt">,
): Task {
  const tasks = getTasks();

  const newTask: Task = {
    ...taskData,
    id: Date.now(),
    status: "Belum Selesai",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  setStorage(STORAGE_KEY, tasks);

  return newTask;
}

// Mengedit tugas
export function updateTask(
  id: number,
  updatedData: Partial<Omit<Task, "id" | "createdAt">>,
): void {
  const tasks = getTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, ...updatedData } : task,
  );

  setStorage(STORAGE_KEY, updatedTasks);
}

// Menghapus tugas
export function deleteTask(id: number): void {
  const tasks = getTasks();

  const filteredTasks = tasks.filter((task) => task.id !== id);

  setStorage(STORAGE_KEY, filteredTasks);
}

// Mengubah status tugas
export function toggleTaskStatus(id: number): void {
  const tasks = getTasks();

  const updatedTasks = tasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    const newStatus: TaskStatus =
      task.status === "Selesai" ? "Belum Selesai" : "Selesai";

    return {
      ...task,
      status: newStatus,
    };
  });

  setStorage(STORAGE_KEY, updatedTasks);
}
