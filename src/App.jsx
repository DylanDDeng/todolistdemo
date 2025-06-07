import React from 'react'
import useDesktopStore from '@/stores/desktopStore'

function App() {
  console.log('PixelRealm OS - 添加桌面状态管理')

  // 测试 Zustand store
  const { desktopIcons } = useDesktopStore()

  return (
    <div className="w-screen h-screen relative" style={{ backgroundColor: '#008080', fontFamily: 'Arial, sans-serif' }}>
      {/* 测试内容 */}
      <div className="absolute top-5 left-5 bg-red-500 text-white p-2 z-50 text-xs">
        ✅ PixelRealm OS + Zustand Store
      </div>

      <div className="absolute top-16 left-5 bg-blue-500 text-white p-2 z-50 text-xs">
        ✅ 桌面图标数量: {desktopIcons.length}
      </div>

      {/* 简单的桌面图标 */}
      {desktopIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute flex flex-col items-center cursor-pointer"
          style={{
            left: icon.position.x,
            top: icon.position.y,
            width: '64px',
          }}
        >
          <div className="w-8 h-8 mb-1 flex items-center justify-center bg-purple-600 border border-gray-600 text-white text-sm">
            {icon.application === 'PromptManager' ? '📝' :
             icon.application === 'FileExplorer' ? '📁' : '⚙️'}
          </div>
          <span className="text-xs text-center text-white leading-tight max-w-full break-words px-1 bg-black bg-opacity-50 rounded-sm">
            {icon.name}
          </span>
        </div>
      ))}

      {/* 任务栏 */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center px-1" style={{
        backgroundColor: 'rgb(192, 192, 192)',
        borderTop: '2px solid white'
      }}>
        <button className="px-2 py-1 text-xs font-bold" style={{
          backgroundColor: 'rgb(192, 192, 192)',
          border: '2px outset rgb(192, 192, 192)'
        }}>
          ✨ Start
        </button>

        <div className="ml-auto mr-2 text-xs">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default App
