import React, { useRef, useEffect } from 'react'
import useDesktopStore from '@/stores/desktopStore'
import useWindowStore from '@/stores/windowStore'
import DesktopIcon from './DesktopIcon'
import ContextMenu from './ContextMenu'
import { useHotkeys } from 'react-hotkeys-hook'

// Import applications
import PromptManager from '@/applications/PromptManager/PromptManager'

const applicationComponents = {
  PromptManager,
  FileExplorer: null, // Placeholder for future implementation
  Settings: null, // Placeholder for future implementation
}

const Desktop = () => {
  const desktopRef = useRef(null)

  // Debug: Add console log
  console.log('Desktop component rendering...')

  const {
    wallpaper,
    desktopIcons,
    selectedIcons,
    contextMenu,
    clearSelection,
    showContextMenu,
    hideContextMenu,
  } = useDesktopStore()

  const { createWindow } = useWindowStore()

  // Debug: Log store data
  console.log('Desktop icons:', desktopIcons)
  console.log('Wallpaper:', wallpaper)

  // Handle desktop click (clear selection and context menu)
  const handleDesktopClick = (e) => {
    if (e.target === desktopRef.current) {
      clearSelection()
      hideContextMenu()
    }
  }

  // Handle desktop right-click (show context menu)
  const handleDesktopRightClick = (e) => {
    e.preventDefault()
    if (e.target === desktopRef.current) {
      clearSelection()
      showContextMenu(
        { x: e.clientX, y: e.clientY },
        [
          {
            label: 'Refresh',
            action: () => {
              // Refresh desktop
              hideContextMenu()
            }
          },
          { type: 'separator' },
          {
            label: 'Personalize',
            action: () => {
              // Open personalization settings
              hideContextMenu()
            }
          },
        ]
      )
    }
  }

  // Handle icon double-click (launch application)
  const handleIconDoubleClick = (icon) => {
    const ApplicationComponent = applicationComponents[icon.application]
    if (ApplicationComponent) {
      createWindow({
        title: icon.name,
        component: ApplicationComponent,
        position: { x: 150, y: 100 },
        size: { width: 800, height: 600 },
        minSize: { width: 400, height: 300 },
      })
    } else {
      // Show a placeholder message for unimplemented applications
      alert(`${icon.name} is coming soon! 🚧`)
    }
    clearSelection()
  }

  // Keyboard shortcuts
  useHotkeys('delete', () => {
    // Handle delete key for selected icons
    if (selectedIcons.length > 0) {
      // Could implement icon deletion here
    }
  })

  useHotkeys('ctrl+a', (e) => {
    e.preventDefault()
    // Select all icons
    desktopIcons.forEach(icon => {
      // Could implement select all here
    })
  })

  useHotkeys('escape', () => {
    clearSelection()
    hideContextMenu()
  })

  // Hide context menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu && !e.target.closest('.context-menu')) {
        hideContextMenu()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [contextMenu, hideContextMenu])

  return (
    <div
      ref={desktopRef}
      className="desktop absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundColor: '#008080', // Fallback teal color
      }}
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopRightClick}
    >
      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
          isSelected={selectedIcons.includes(icon.id)}
          onDoubleClick={() => handleIconDoubleClick(icon)}
        />
      ))}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          position={contextMenu.position}
          items={contextMenu.items}
          onClose={hideContextMenu}
        />
      )}
    </div>
  )
}

export default Desktop
