import React from 'react'

const TaskbarButton = ({ window, onClick }) => {
  return (
    <button
      className={`taskbar-button max-w-32 ${window.isActive && !window.isMinimized ? 'active' : ''}`}
      onClick={onClick}
      title={window.title}
    >
      <span className="truncate font-pixel text-xs">
        {window.title}
      </span>
    </button>
  )
}

export default TaskbarButton
