import { randomUUID } from 'crypto';

export function generateId(prefix?: string): string {
  const p = prefix ? `${prefix}_` : '';
  try {
    return `${p}${randomUUID()}`;
  } catch {
    return `${p}${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }
}