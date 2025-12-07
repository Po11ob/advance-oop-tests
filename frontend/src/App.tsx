import React, { useEffect, useState } from 'react'
import * as api from './api'
import { Habit } from './types'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Habit | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getHabits()
      setHabits(data)
    } catch (e) {
      console.error(e)
      alert(`Failed to load habits: ${e}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleCreate = async (h: Habit) => {
    try {
      const created = await api.createHabit(h)
      setHabits((s) => [created, ...s])
    } catch (e) {
      alert(`Create failed: ${e}`)
    }
  }

  const handleToggle = async (id: number, status: boolean) => {
    try {
      await api.patchHabit(id, { status })
      setHabits((s) => s.map((it) => (it.id === id ? { ...it, status } : it)))
    } catch (e) {
      alert(`Update failed: ${e}`)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this habit?')) return
    try {
      await api.deleteHabit(id)
      setHabits((s) => s.filter((it) => it.id !== id))
    } catch (e) {
      alert(`Delete failed: ${e}`)
    }
  }

  const handleEdit = (h: Habit) => setEditing(h)

  const handleSaveEdit = async (h: Habit) => {
    if (!h.id) return
    try {
      const updated = await api.updateHabit(h.id, h)
      setHabits((s) => s.map((it) => (it.id === updated.id ? updated : it)))
      setEditing(null)
    } catch (e) {
      alert(`Save failed: ${e}`)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Daily Habit Tracker</h1>
        <p>Full-stack CRUD demo — Advanced OOP Tests</p>
      </header>

      <section className="panel">
        <h2>Create Habit</h2>
        <HabitForm onSave={handleCreate} saveLabel="Add" />
      </section>

      <section className="panel">
        <h2>Habits</h2>
        {loading ? <div>Loading…</div> : <HabitList habits={habits} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />}
      </section>

      {editing ? (
        <section className="panel">
          <h2>Edit Habit</h2>
          <HabitForm initial={editing} onSave={handleSaveEdit} saveLabel="Save" />
          <div className="actions">
            <button onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
