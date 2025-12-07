import React from 'react'
import { Habit } from '../types'

type Props = {
  habit: Habit
  onToggle: (id: number, status: boolean) => void
  onEdit: (h: Habit) => void
  onDelete: (id: number) => void
}

export default function HabitItem({ habit, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className={`habit-item ${habit.status ? 'done' : ''}`}>
      <div className="top">
        <div>
          <div className="name">{habit.name}</div>
          <div className="meta">{habit.frequency}</div>
        </div>
        <div className="controls">
          <label>
            <input
              type="checkbox"
              checked={habit.status}
              onChange={(e) => onToggle(habit.id!, e.target.checked)}
            />
            Done
          </label>
        </div>
      </div>
      {habit.note ? <div className="note">{habit.note}</div> : null}
      <div className="actions">
        <button onClick={() => onEdit(habit)}>Edit</button>
        <button className="danger" onClick={() => onDelete(habit.id!)}>
          Delete
        </button>
      </div>
    </div>
  )
}
