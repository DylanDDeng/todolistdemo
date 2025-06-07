import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ContextMenu = ({ position, items, onClose }) => {
  const menuRef = useRef(null)

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

  const handleItemClick = (item) => {
    if (item.action) {
      item.action()
    }
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        className="context-menu fixed z-50 min-w-32 py-1"
        style={{
          left: position.x,
          top: position.y,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        {items.map((item, index) => (
          <div key={index}>
            {item.type === 'separator' ? (
              <div className="context-menu-separator" />
            ) : (
              <div
                className="context-menu-item font-pixel text-xs"
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default ContextMenu
