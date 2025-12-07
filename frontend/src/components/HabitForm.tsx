import React, { useState } from 'react'
import { Habit } from '../types'

type Props = {
  onSave: (h: Habit) => void
  initial?: Habit
  saveLabel?: string
}

export default function HabitForm({ onSave, initial, saveLabel = 'Save' }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [frequency, setFrequency] = useState(initial?.frequency ?? 'Daily')
  const [note, setNote] = useState(initial?.note ?? '')
  const [status, setStatus] = useState(initial?.status ?? false)

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!name.trim()) return
    onSave({ ...initial, name: name.trim(), frequency, note: note.trim(), status } as Habit)
    setName('')
    setNote('')
    setStatus(false)
  }

  return (
    <form onSubmit={submit} className="habit-form">
      <div className="row">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="row">
        <label>Frequency</label>
        <input value={frequency} onChange={(e) => setFrequency(e.target.value)} />
      </div>
      <div className="row">
        <label>Note</label>
        <input value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <div className="row">
        <label>Status</label>
        <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
      </div>
      <div className="actions">
        <button type="submit">{saveLabel}</button>
      </div>
    </form>
  )
}
