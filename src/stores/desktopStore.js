import { create } from 'zustand'

const useDesktopStore = create((set, get) => ({
  wallpaper: '/assets/wallpapers/default-fantasy.jpg',
  desktopIcons: [
    {
      id: 'prompt-manager',
      name: 'Prompt Manager',
      position: { x: 20, y: 20 },
      application: 'PromptManager',
    },
    {
      id: 'file-explorer',
      name: 'File Explorer',
      position: { x: 20, y: 100 },
      application: 'FileExplorer',
    },
    {
      id: 'settings',
      name: 'Settings',
      position: { x: 20, y: 180 },
      application: 'Settings',
    },
  ],
  selectedIcons: [],
  contextMenu: null,

  // Set wallpaper
  setWallpaper: (wallpaperPath) => {
    set({ wallpaper: wallpaperPath })
  },

  // Add desktop icon
  addDesktopIcon: (icon) => {
    set((state) => ({
      desktopIcons: [...state.desktopIcons, {
        ...icon,
        id: icon.id || `icon-${Date.now()}`,
      }]
    }))
  },

  // Remove desktop icon
  removeDesktopIcon: (iconId) => {
    set((state) => ({
      desktopIcons: state.desktopIcons.filter(icon => icon.id !== iconId),
      selectedIcons: state.selectedIcons.filter(id => id !== iconId),
    }))
  },

  // Update icon position
  updateIconPosition: (iconId, position) => {
    set((state) => ({
      desktopIcons: state.desktopIcons.map(icon =>
        icon.id === iconId ? { ...icon, position } : icon
      )
    }))
  },

  // Select icon(s)
  selectIcon: (iconId, multiSelect = false) => {
    set((state) => {
      if (multiSelect) {
        const isSelected = state.selectedIcons.includes(iconId)
        return {
          selectedIcons: isSelected
            ? state.selectedIcons.filter(id => id !== iconId)
            : [...state.selectedIcons, iconId]
        }
      } else {
        return {
          selectedIcons: [iconId]
        }
      }
    })
  },

  // Clear icon selection
  clearSelection: () => {
    set({ selectedIcons: [] })
  },

  // Show context menu
  showContextMenu: (position, items) => {
    set({
      contextMenu: {
        position,
        items,
        id: `context-${Date.now()}`
      }
    })
  },

  // Hide context menu
  hideContextMenu: () => {
    set({ contextMenu: null })
  },

  // Get icon by ID
  getIcon: (iconId) => {
    return get().desktopIcons.find(icon => icon.id === iconId)
  },

  // Get selected icons
  getSelectedIcons: () => {
    const state = get()
    return state.desktopIcons.filter(icon => 
      state.selectedIcons.includes(icon.id)
    )
  },
}))

export default useDesktopStore
