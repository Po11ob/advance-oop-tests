import { Habit } from './types'

const BASE = (import.meta.env.VITE_BACKEND_URL as string) || 'http://localhost:8080'

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`${res.status} ${res.statusText}: ${txt}`)
  }
  if (res.status === 204) return null as any
  return res.json()
}

export function getHabits(): Promise<Habit[]> {
  return request('/habits')
}

export function createHabit(h: Habit): Promise<Habit> {
  return request('/habits', { method: 'POST', body: JSON.stringify(h) })
}

export function updateHabit(id: number, h: Habit): Promise<Habit> {
  return request(`/habits/${id}`, { method: 'PUT', body: JSON.stringify(h) })
}

export function patchHabit(id: number, patch: Partial<Habit>): Promise<Habit> {
  return request(`/habits/${id}`, { method: 'PATCH', body: JSON.stringify(patch) })
}

export function deleteHabit(id: number): Promise<void> {
  return request(`/habits/${id}`, { method: 'DELETE' })
}

export default { getHabits, createHabit, updateHabit, patchHabit, deleteHabit }
