import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a task"
        aria-label="Add a task"
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  )
}

export default TaskForm
