export const STORAGE_KEYS = {
  USER: "jbf_user",
} as const;

export function getStorageItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    // Invalid JSON or storage access error — remove corrupted entry
    localStorage.removeItem(key);
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or access error — silently fail
  }
}

export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Access error — silently fail
  }
}
