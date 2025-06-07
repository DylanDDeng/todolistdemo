import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const LOCAL_STORAGE_KEY = 'pixelrealm-prompts'

function PromptManager({ windowId }) {
  const [promptTitle, setPromptTitle] = useState("")
  const [promptText, setPromptText] = useState("")
  const [savedPrompts, setSavedPrompts] = useState([])

  // Load prompts from Local Storage on component mount
  useEffect(() => {
    const storedPrompts = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedPrompts) {
      try {
        const parsedPrompts = JSON.parse(storedPrompts)
        setSavedPrompts(parsedPrompts)
      } catch (error) {
        console.error("Error parsing prompts from Local Storage:", error)
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        setSavedPrompts([])
      }
    }
  }, [])

  const handleSavePrompt = () => {
    if (!promptTitle.trim() || !promptText.trim()) {
      alert("Prompt title and text cannot be empty.")
      return
    }

    const newPrompt = {
      id: Date.now(),
      title: promptTitle,
      text: promptText,
      createdAt: new Date().toISOString(),
    }

    let currentPrompts = []
    const storedPrompts = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedPrompts) {
      try {
        currentPrompts = JSON.parse(storedPrompts)
      } catch (error) {
        console.error("Error parsing prompts before saving:", error)
        currentPrompts = []
      }
    }

    const updatedPrompts = [...currentPrompts, newPrompt]

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPrompts))
      setSavedPrompts(updatedPrompts)
      setPromptTitle("")
      setPromptText("")
    } catch (error) {
      console.error("Error saving prompts to Local Storage:", error)
      alert("Failed to save prompt. Local Storage might be full or unavailable.")
    }
  }

  const handleDeletePrompt = (promptId) => {
    const updatedPrompts = savedPrompts.filter(prompt => prompt.id !== promptId)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPrompts))
    setSavedPrompts(updatedPrompts)
  }

  const handleCopyPrompt = (promptText) => {
    navigator.clipboard.writeText(promptText).then(() => {
      // Could show a toast notification here
      console.log('Prompt copied to clipboard')
    }).catch(err => {
      console.error('Failed to copy prompt: ', err)
    })
  }

  return (
    <div className="h-full flex flex-col space-y-4 allow-select">
      {/* Prompt Creation Area */}
      <fieldset className="border-2 border-t-w95-darkgrey border-l-w95-darkgrey border-r-w95-white border-b-w95-white p-3 space-y-3 shadow-w95-panel">
        <legend className="px-1 font-pixel text-xs">Create New Prompt</legend>

        <div>
          <label htmlFor="promptTitle" className="block mb-1 font-pixel text-xs">Prompt Title:</label>
          <Input
            type="text"
            id="promptTitle"
            value={promptTitle}
            onChange={(e) => setPromptTitle(e.target.value)}
            placeholder="Enter title..."
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="promptText" className="block mb-1 font-pixel text-xs">Prompt Text:</label>
          <Textarea
            id="promptText"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Enter prompt details..."
            className="w-full min-h-[100px]"
          />
        </div>

        <Button onClick={handleSavePrompt} variant="w95" size="w95" className="font-pixel">
          💾 Save Prompt
        </Button>
      </fieldset>

      {/* Saved Prompts Area */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-sm mb-2 font-pixel font-bold">Saved Prompts ({savedPrompts.length})</h2>
        <div className="flex-1 p-2 border-2 border-t-w95-darkgrey border-l-w95-darkgrey border-r-w95-white border-b-w95-white shadow-w95-panel overflow-y-auto space-y-2 bg-w95-white">
          {savedPrompts.length > 0 ? (
            savedPrompts.map(prompt => (
              <div key={prompt.id} className="p-2 border border-w95-darkgrey shadow-w95-panel-raised bg-w95-silver">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold font-pixel text-xs truncate flex-1">{prompt.title}</h3>
                  <div className="flex space-x-1 ml-2">
                    <Button
                      onClick={() => handleCopyPrompt(prompt.text)}
                      variant="w95"
                      size="w95"
                      className="text-xs px-1"
                      title="Copy to clipboard"
                    >
                      📋
                    </Button>
                    <Button
                      onClick={() => handleDeletePrompt(prompt.id)}
                      variant="w95"
                      size="w95"
                      className="text-xs px-1"
                      title="Delete prompt"
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
                <p className="text-xs font-pixel text-w95-black mb-1 line-clamp-3">{prompt.text}</p>
                {prompt.createdAt && (
                  <p className="text-xs font-pixel text-w95-darkgrey">
                    Created: {new Date(prompt.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-w95-darkgrey">
              <div className="text-4xl mb-2">📝</div>
              <p className="font-pixel text-xs text-center">No prompts saved yet.<br />Create your first prompt above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PromptManager
