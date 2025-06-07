import React, { useRef, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Square, X } from 'lucide-react'
import useWindowStore from '@/stores/windowStore'
import 'react-resizable/css/styles.css'

const Window = ({ window }) => {
  const windowRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore()

  const handleMouseDown = () => {
    focusWindow(window.id)
  }

  const handleDragStart = () => {
    setIsDragging(true)
    focusWindow(window.id)
  }

  const handleDragStop = (e, data) => {
    setIsDragging(false)
    updateWindowPosition(window.id, { x: data.x, y: data.y })
  }

  const handleResize = (e, { size }) => {
    updateWindowSize(window.id, size)
  }

  const handleClose = () => {
    closeWindow(window.id)
  }

  const handleMinimize = () => {
    minimizeWindow(window.id)
  }

  const handleMaximize = () => {
    maximizeWindow(window.id)
  }

  // Don't render minimized windows
  if (window.isMinimized) {
    return null
  }

  const windowStyle = {
    position: 'absolute',
    zIndex: window.zIndex,
    left: window.isMaximized ? 0 : window.position.x,
    top: window.isMaximized ? 0 : window.position.y,
    width: window.isMaximized ? '100vw' : window.size.width,
    height: window.isMaximized ? 'calc(100vh - 32px)' : window.size.height, // Account for taskbar
  }

  const WindowContent = window.component

  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        style={windowStyle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        onMouseDown={handleMouseDown}
        className="window-container"
      >
        {window.isMaximized ? (
          // Maximized window (not draggable/resizable)
          <div className={`window-chrome ${window.isActive ? 'active' : ''} h-full flex flex-col`}>
            <div className={`window-titlebar ${window.isActive ? '' : 'inactive'}`}>
              <span className="font-pixel text-xs font-bold truncate flex-1">
                {window.title}
              </span>
              <div className="flex space-x-1 ml-2">
                <button
                  className="window-button"
                  onClick={handleMinimize}
                  title="Minimize"
                >
                  <Minus size={8} />
                </button>
                <button
                  className="window-button"
                  onClick={handleMaximize}
                  title="Restore"
                >
                  <Square size={8} />
                </button>
                <button
                  className="window-button"
                  onClick={handleClose}
                  title="Close"
                >
                  <X size={8} />
                </button>
              </div>
            </div>
            <div className="window-content flex-1 overflow-auto">
              {WindowContent && <WindowContent {...window.props} windowId={window.id} />}
            </div>
          </div>
        ) : (
          // Normal window (draggable and resizable)
          <Draggable
            handle=".window-titlebar"
            position={{ x: 0, y: 0 }}
            onStart={handleDragStart}
            onStop={handleDragStop}
            disabled={!window.isDraggable}
          >
            <div>
              <ResizableBox
                width={window.size.width}
                height={window.size.height}
                minConstraints={[window.minSize.width, window.minSize.height]}
                maxConstraints={[window.maxSize.width, window.maxSize.height]}
                onResize={handleResize}
                resizeHandles={window.isResizable ? ['se', 'e', 's', 'w', 'n', 'sw', 'ne', 'nw'] : []}
                className="window-resizable"
              >
                <div className={`window-chrome ${window.isActive ? 'active' : ''} h-full flex flex-col`}>
                  <div className={`window-titlebar ${window.isActive ? '' : 'inactive'}`}>
                    <span className="font-pixel text-xs font-bold truncate flex-1">
                      {window.title}
                    </span>
                    <div className="flex space-x-1 ml-2">
                      <button
                        className="window-button"
                        onClick={handleMinimize}
                        title="Minimize"
                      >
                        <Minus size={8} />
                      </button>
                      <button
                        className="window-button"
                        onClick={handleMaximize}
                        title="Maximize"
                      >
                        <Square size={8} />
                      </button>
                      <button
                        className="window-button"
                        onClick={handleClose}
                        title="Close"
                      >
                        <X size={8} />
                      </button>
                    </div>
                  </div>
                  <div className="window-content flex-1 overflow-auto">
                    {WindowContent && <WindowContent {...window.props} windowId={window.id} />}
                  </div>
                </div>
              </ResizableBox>
            </div>
          </Draggable>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Window
