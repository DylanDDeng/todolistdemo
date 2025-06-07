import React, { useState } from 'react'
import Draggable from 'react-draggable'
import useDesktopStore from '@/stores/desktopStore'

// Helper function to get emoji icons for applications
const getIconEmoji = (application) => {
  const iconMap = {
    PromptManager: '📝',
    FileExplorer: '📁',
    Settings: '⚙️',
    Calculator: '🧮',
    TextEditor: '📄',
  }
  return iconMap[application] || '📦'
}

const DesktopIcon = ({ icon, isSelected, onDoubleClick }) => {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const { selectIcon, updateIconPosition, showContextMenu, hideContextMenu } = useDesktopStore()

  const handleClick = (e) => {
    e.stopPropagation()
    selectIcon(icon.id, e.ctrlKey || e.metaKey)
    hideContextMenu()
  }

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    onDoubleClick(icon)
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isSelected) {
      selectIcon(icon.id, false)
    }

    showContextMenu(
      { x: e.clientX, y: e.clientY },
      [
        {
          label: 'Open',
          action: () => {
            onDoubleClick(icon)
            hideContextMenu()
          }
        },
        { type: 'separator' },
        {
          label: 'Properties',
          action: () => {
            // Open properties dialog
            hideContextMenu()
          }
        },
      ]
    )
  }

  const handleDragStop = (e, data) => {
    const newPosition = {
      x: icon.position.x + data.x,
      y: icon.position.y + data.y,
    }
    updateIconPosition(icon.id, newPosition)
    setDragPosition({ x: 0, y: 0 })
  }

  return (
    <Draggable
      position={dragPosition}
      onStop={handleDragStop}
      bounds="parent"
    >
      <div
        className={`desktop-icon absolute ${isSelected ? 'selected' : ''}`}
        style={{
          left: icon.position.x,
          top: icon.position.y,
          width: 64,
          height: 80,
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleRightClick}
      >
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 mb-1 flex items-center justify-center">
            <div className="w-8 h-8 bg-mystic-purple border border-w95-darkgrey flex items-center justify-center text-w95-white text-sm font-bold">
              {getIconEmoji(icon.application)}
            </div>
          </div>
          <span className="text-xs text-center text-w95-white font-pixel leading-tight max-w-full break-words px-1 bg-black bg-opacity-50 rounded-sm">
            {icon.name}
          </span>
        </div>
      </div>
    </Draggable>
  )
}

export default DesktopIcon
