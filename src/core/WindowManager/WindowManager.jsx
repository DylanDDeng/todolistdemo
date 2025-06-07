import React from 'react'
import useWindowStore from '@/stores/windowStore'
import Window from './Window'

const WindowManager = () => {
  const { windows } = useWindowStore()

  return (
    <div className="window-manager absolute inset-0 pointer-events-none">
      {windows.map((window) => (
        <div key={window.id} className="pointer-events-auto">
          <Window window={window} />
        </div>
      ))}
    </div>
  )
}

export default WindowManager
