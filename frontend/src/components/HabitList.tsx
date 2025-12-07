import React from 'react'
import { Habit } from '../types'
import HabitItem from './HabitItem'

type Props = {
  habits: Habit[]
  onToggle: (id: number, status: boolean) => void
  onEdit: (h: Habit) => void
  onDelete: (id: number) => void
}

export default function HabitList({ habits, onToggle, onEdit, onDelete }: Props) {
  if (!habits.length) return <div className="empty">No habits yet.</div>
  return (
    <div className="habit-list">
      {habits.map((h) => (
        <HabitItem key={h.id} habit={h} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
