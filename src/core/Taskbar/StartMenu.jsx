import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWindowStore from '@/stores/windowStore'
import PromptManager from '@/applications/PromptManager/PromptManager'

const StartMenu = ({ onClose }) => {
  const menuRef = useRef(null)
  const { createWindow } = useWindowStore()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const launchApplication = (appName, component, title) => {
    createWindow({
      title,
      component,
      position: { x: 150, y: 100 },
      size: { width: 800, height: 600 },
      minSize: { width: 400, height: 300 },
    })
    onClose()
  }

  const menuItems = [
    {
      label: 'Prompt Manager',
      icon: '📝',
      action: () => launchApplication('PromptManager', PromptManager, 'Prompt Manager'),
    },
    {
      label: 'File Explorer',
      icon: '📁',
      action: () => {
        // TODO: Implement File Explorer
        console.log('File Explorer not yet implemented')
        onClose()
      },
    },
    {
      label: 'Settings',
      icon: '⚙️',
      action: () => {
        // TODO: Implement Settings
        console.log('Settings not yet implemented')
        onClose()
      },
    },
  ]

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        className="absolute bottom-8 left-0 w-64 bg-w95-silver border-2 border-t-w95-white border-l-w95-white border-r-w95-darkgrey border-b-w95-darkgrey shadow-w95-panel-raised"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {/* Start Menu Header */}
        <div className="bg-gradient-to-r from-mystic-purple to-ethereal-blue text-w95-white p-2 font-pixel font-bold text-sm">
          PixelRealm OS
        </div>

        {/* Menu Items */}
        <div className="p-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-2 hover:bg-mystic-purple hover:text-w95-white cursor-pointer font-pixel text-xs"
              onClick={item.action}
            >
              <span className="mr-3 text-base">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Start Menu Footer */}
        <div className="border-t border-w95-darkgrey p-1">
          <div className="flex items-center p-2 hover:bg-mystic-purple hover:text-w95-white cursor-pointer font-pixel text-xs">
            <span className="mr-3 text-base">🔌</span>
            <span>Shut Down...</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default StartMenu
