import { create } from 'zustand'

const useWindowStore = create((set, get) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1000,

  // Create a new window
  createWindow: (windowConfig) => {
    const newWindow = {
      id: `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: windowConfig.title || 'Untitled Window',
      component: windowConfig.component,
      props: windowConfig.props || {},
      position: windowConfig.position || { x: 100, y: 100 },
      size: windowConfig.size || { width: 600, height: 400 },
      minSize: windowConfig.minSize || { width: 300, height: 200 },
      maxSize: windowConfig.maxSize || { width: 1200, height: 800 },
      isMinimized: false,
      isMaximized: false,
      isResizable: windowConfig.isResizable !== false,
      isDraggable: windowConfig.isDraggable !== false,
      zIndex: get().nextZIndex,
      isActive: true,
    }

    set((state) => ({
      windows: [...state.windows, newWindow],
      activeWindowId: newWindow.id,
      nextZIndex: state.nextZIndex + 1,
    }))

    return newWindow.id
  },

  // Close a window
  closeWindow: (windowId) => {
    set((state) => {
      const newWindows = state.windows.filter(w => w.id !== windowId)
      const newActiveId = newWindows.length > 0 
        ? newWindows[newWindows.length - 1].id 
        : null
      
      return {
        windows: newWindows,
        activeWindowId: newActiveId,
      }
    })
  },

  // Focus a window (bring to front)
  focusWindow: (windowId) => {
    set((state) => {
      const window = state.windows.find(w => w.id === windowId)
      if (!window || window.isMinimized) return state

      return {
        windows: state.windows.map(w => ({
          ...w,
          zIndex: w.id === windowId ? state.nextZIndex : w.zIndex,
          isActive: w.id === windowId,
        })),
        activeWindowId: windowId,
        nextZIndex: state.nextZIndex + 1,
      }
    })
  },

  // Minimize a window
  minimizeWindow: (windowId) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === windowId 
          ? { ...w, isMinimized: true, isActive: false }
          : w
      ),
      activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
    }))
  },

  // Restore a minimized window
  restoreWindow: (windowId) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === windowId 
          ? { ...w, isMinimized: false, isMaximized: false, zIndex: state.nextZIndex, isActive: true }
          : { ...w, isActive: false }
      ),
      activeWindowId: windowId,
      nextZIndex: state.nextZIndex + 1,
    }))
  },

  // Maximize a window
  maximizeWindow: (windowId) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === windowId 
          ? { ...w, isMaximized: !w.isMaximized, isMinimized: false }
          : w
      ),
    }))
  },

  // Update window position
  updateWindowPosition: (windowId, position) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === windowId 
          ? { ...w, position }
          : w
      ),
    }))
  },

  // Update window size
  updateWindowSize: (windowId, size) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === windowId 
          ? { ...w, size }
          : w
      ),
    }))
  },

  // Get window by ID
  getWindow: (windowId) => {
    return get().windows.find(w => w.id === windowId)
  },

  // Get all open windows (not minimized)
  getOpenWindows: () => {
    return get().windows.filter(w => !w.isMinimized)
  },

  // Get all minimized windows
  getMinimizedWindows: () => {
    return get().windows.filter(w => w.isMinimized)
  },
}))

export default useWindowStore
