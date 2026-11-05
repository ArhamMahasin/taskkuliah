const STORAGE_PREFIX = "taskkuliah_";

// Generic function untuk membaca data
export function getStorage<T>(key: string, defaultValue: T): T {
  const data = localStorage.getItem(STORAGE_PREFIX + key);

  if (!data) {
    return defaultValue;
  }

  try {
    return JSON.parse(data) as T;
  } catch {
    return defaultValue;
  }
}

// Generic function untuk menyimpan data
export function setStorage<T>(key: string, value: T): void {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
}

// Function untuk menghapus data
export function removeStorage(key: string): void {
  localStorage.removeItem(STORAGE_PREFIX + key);
}
