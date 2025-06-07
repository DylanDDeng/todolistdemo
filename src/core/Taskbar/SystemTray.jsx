import React, { useState, useEffect } from 'react'

const SystemTray = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  return (
    <div className="flex items-center space-x-2 px-2">
      {/* System Icons */}
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 bg-mystic-purple border border-w95-darkgrey flex items-center justify-center">
          <span className="text-w95-white text-xs">🔊</span>
        </div>
      </div>

      {/* Clock */}
      <div className="taskbar-button px-2 font-pixel text-xs">
        {formatTime(currentTime)}
      </div>
    </div>
  )
}

export default SystemTray
