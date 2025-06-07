# PixelRealm OS

A fantasy pixel retro-style operating system built with React, featuring a modular architecture and dreamy magical aesthetic combined with classic pixel art.

## Features

- **Window Management System**: Draggable, resizable windows with proper Z-index management
- **Desktop Environment**: Desktop icons, wallpaper support, and right-click context menus
- **Taskbar**: Start menu, running application buttons, and system tray with clock
- **Modular Applications**: Easy-to-add application framework
- **Fantasy Pixel Design**: Retro computing aesthetics with magical elements

## Applications

- **Prompt Manager**: Create, save, and manage text prompts with local storage
- **File Explorer**: (Coming soon)
- **Settings**: (Coming soon)
- **Calculator**: (Coming soon)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Architecture

- **React + Vite**: Modern development stack
- **Tailwind CSS**: Utility-first styling with custom W95 and fantasy themes
- **Zustand**: Lightweight state management
- **Framer Motion**: Smooth animations and transitions
- **React Draggable**: Window dragging functionality
- **React Resizable**: Window resizing capabilities

## Project Structure

```
src/
├── core/              # OS core systems
│   ├── Desktop/       # Desktop environment
│   ├── WindowManager/ # Window management
│   └── Taskbar/       # Taskbar and start menu
├── applications/      # Built-in applications
├── components/        # Shared UI components
├── stores/           # State management
├── styles/           # Global styles and themes
└── utils/            # Utility functions
```