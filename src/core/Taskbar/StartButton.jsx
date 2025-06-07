import React, { useState } from 'react'
import StartMenu from './StartMenu'

const StartButton = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen)
  }

  return (
    <div className="relative">
      <button
        className={`taskbar-button font-pixel font-bold px-3 ${isStartMenuOpen ? 'active' : ''}`}
        onClick={toggleStartMenu}
      >
        ✨ Start
      </button>
      
      {isStartMenuOpen && (
        <StartMenu onClose={() => setIsStartMenuOpen(false)} />
      )}
    </div>
  )
}

export default StartButton
