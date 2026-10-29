function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'task-item completed' : 'task-item'}>
      <input
        id={`task-${task.id}`}
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <label htmlFor={`task-${task.id}`} className={task.completed ? 'task-label completed' : 'task-label'}>
        {task.text}
      </label>
      <button type="button" className="delete-btn" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.text}`}>
        ×
      </button>
    </li>
  )
}

export default TaskItem
