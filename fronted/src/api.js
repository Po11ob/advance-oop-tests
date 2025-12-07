const BASE_URL = typeof global.__BACKEND_URL__ !== 'undefined' ? global.__BACKEND_URL__ : 'http://localhost:8080';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function getHabits() {
  return request('/habits');
}

export async function createHabit(habit) {
  return request('/habits', { method: 'POST', body: JSON.stringify(habit) });
}

export async function toggleHabitStatus(id, status) {
  // assuming backend accepts PUT to update entire resource
  return request(`/habits/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });
}

export async function deleteHabit(id) {
  return request(`/habits/${id}`, { method: 'DELETE' });
}

export default {
  getHabits,
  createHabit,
  toggleHabitStatus,
  deleteHabit,
};
