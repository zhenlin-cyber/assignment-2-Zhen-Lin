import { useMemo, useState } from 'react'
import './App.css'
import TaskCounter from './components/TaskCounter'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'

const initialTasks = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')

  const completedCount = tasks.filter((task) => task.completed).length

  const visibleTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((task) => !task.completed)
    if (filter === 'completed') return tasks.filter((task) => task.completed)
    return tasks
  }, [filter, tasks])

  function addTask(text) {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ])
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" aria-label="Toggle navigation" />

      <header className="main-header">
        <section className="header-inner">
          <img src={menuIcon} alt="menu" className="menu-btn desktop-menu" />

          <label htmlFor="menu-toggle" className="menu-btn hamburger" aria-label="Open menu">
            <span />
            <span />
            <span />
          </label>

          <form className="quick-find" role="search">
            <img src={searchIcon} alt="search icon" className="search-icon" />
            <input type="search" name="q" placeholder="Quick find" aria-label="Quick find" />
          </form>

          <TaskCounter total={tasks.length} completed={completedCount} />

          <input type="checkbox" id="header-check" className="header-check-input" aria-hidden="true" />
          <label htmlFor="header-check" className="header-check-label" aria-label="Select tasks" />
        </section>
      </header>

      <nav className="sidebar" aria-label="Primary">
        <ul className="nav-list">
          <li className="nav-item">
            <img src={inboxIcon} alt="inbox icon" className="nav-icon" />
            <span className="nav-label">Inbox</span>
            <span className="nav-count">{tasks.length}</span>
          </li>
          <li className="nav-item">
            <img src={calendarIcon} alt="today icon" className="nav-icon" />
            <span className="nav-label">Today</span>
            <span className="nav-count">{tasks.filter((task) => !task.completed).length}</span>
          </li>
          <li className="nav-item">
            <img src={upcomingIcon} alt="upcoming icon" className="nav-icon" />
            <span className="nav-label">Upcoming</span>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <section className="inbox">
          <h1>Inbox</h1>

          <div className="filter-row" aria-label="Task filters">
            {['all', 'active', 'completed'].map((option) => (
              <button
                key={option}
                type="button"
                className={filter === option ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter(option)}
              >
                {option === 'all' ? 'All' : option === 'active' ? 'Active' : 'Completed'}
              </button>
            ))}
          </div>

          <TaskForm onAdd={addTask} />
          <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </section>
      </main>
    </>
  )
}

export default App
