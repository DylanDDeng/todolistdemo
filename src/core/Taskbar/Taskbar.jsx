import React, { useState, useEffect } from 'react'
import useWindowStore from '@/stores/windowStore'
import useDesktopStore from '@/stores/desktopStore'
import StartButton from './StartButton'
import TaskbarButton from './TaskbarButton'
import SystemTray from './SystemTray'

const Taskbar = () => {
  const { windows, focusWindow, restoreWindow } = useWindowStore()
  const { hideContextMenu } = useDesktopStore()

  const handleTaskbarClick = () => {
    hideContextMenu()
  }

  const handleWindowButtonClick = (window) => {
    if (window.isMinimized) {
      restoreWindow(window.id)
    } else {
      focusWindow(window.id)
    }
  }

  return (
    <div className="taskbar" onClick={handleTaskbarClick}>
      {/* Start Button */}
      <StartButton />

      {/* Window Buttons */}
      <div className="flex-1 flex items-center space-x-1 px-2">
        {windows.map((window) => (
          <TaskbarButton
            key={window.id}
            window={window}
            onClick={() => handleWindowButtonClick(window)}
          />
        ))}
      </div>

      {/* System Tray */}
      <SystemTray />
    </div>
  )
}

export default Taskbar
