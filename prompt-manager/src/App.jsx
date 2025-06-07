import { useState, useEffect } from 'react' // Import useEffect
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const LOCAL_STORAGE_KEY = 'prompts';

function App() {
  const [promptTitle, setPromptTitle] = useState("")
  const [promptText, setPromptText] = useState("")
  const [savedPrompts, setSavedPrompts] = useState([]); // Initialize as empty, load from LS

  // Load prompts from Local Storage on component mount
  useEffect(() => {
    const storedPrompts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedPrompts) {
      try {
        const parsedPrompts = JSON.parse(storedPrompts);
        setSavedPrompts(parsedPrompts);
      } catch (error) {
        console.error("Error parsing prompts from Local Storage:", error);
        // Optionally, clear corrupted data or set to default
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setSavedPrompts([]); // Reset to empty if corrupted
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleSavePrompt = () => {
    if (!promptTitle.trim() || !promptText.trim()) {
      // Simple validation: prevent saving empty prompts (optional: show alert)
      alert("Prompt title and text cannot be empty."); // Basic alert
      return;
    }

    const newPrompt = {
      id: Date.now(), // Unique ID for the prompt
      title: promptTitle,
      text: promptText,
    };

    // Retrieve existing prompts, add new one, then save
    let currentPrompts = [];
    const storedPrompts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedPrompts) {
      try {
        currentPrompts = JSON.parse(storedPrompts);
      } catch (error) {
        console.error("Error parsing prompts before saving:", error);
        // If parsing fails, might indicate corruption. Overwriting might be one strategy,
        // or more sophisticated error handling / recovery could be implemented.
        // For this basic version, we'll proceed with an empty array if parsing fails,
        // effectively starting fresh if there was corruption.
        currentPrompts = [];
      }
    }

    const updatedPrompts = [...currentPrompts, newPrompt];

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPrompts));
      setSavedPrompts(updatedPrompts); // Update state to reflect the new list
      setPromptTitle(""); // Clear input fields
      setPromptText("");
    } catch (error) {
      console.error("Error saving prompts to Local Storage:", error);
      // Handle potential errors during stringify or setItem (e.g., storage full)
      alert("Failed to save prompt. Local Storage might be full or unavailable.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-w95-silver p-4 font-pixel">
      {/* W95 Style Window */}
      <div className="w-full max-w-2xl border-2 border-t-w95-white border-l-w95-white border-r-w95-darkgrey border-b-w95-darkgrey bg-w95-silver shadow-w95-panel-raised">
        {/* Title Bar */}
        <div className="flex items-center justify-between bg-w95-blue text-w95-white p-1 select-none">
          <span className="font-bold">Prompt Manager 95</span>
          <div className="flex space-x-1">
            {/* Minimized the button code for brevity, actual implementation may vary */}
            <button className="w-4 h-4 bg-w95-silver !shadow-w95-button active:!shadow-w95-button-pressed text-w95-black text-xs leading-none p-0">_</button>
            <button className="w-4 h-4 bg-w95-silver !shadow-w95-button active:!shadow-w95-button-pressed text-w95-black text-xs leading-none p-0">?</button>
            <button className="w-4 h-4 bg-w95-silver !shadow-w95-button active:!shadow-w95-button-pressed text-w95-black text-xs leading-none p-0">X</button>
          </div>
        </div>

        {/* Window Content Area */}
        <div className="p-4 space-y-6">
          {/* Prompt Creation Area */}
          <fieldset className="border-2 border-t-w95-darkgrey border-l-w95-darkgrey border-r-w95-white border-b-w95-white p-3 space-y-3 shadow-w95-panel">
            <legend className="px-1">Create New Prompt</legend>

            <div>
              <label htmlFor="promptTitle" className="block mb-1">Prompt Title:</label>
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
              <label htmlFor="promptText" className="block mb-1">Prompt Text:</label>
              <Textarea
                id="promptText"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Enter prompt details..."
                className="w-full min-h-[100px]"
              />
            </div>

            <Button onClick={handleSavePrompt} variant="w95" size="w95" className="font-pixel">
              Save Prompt
            </Button>
          </fieldset>

          {/* Saved Prompts Area */}
          <div>
            <h2 className="text-lg mb-2">Saved Prompts</h2>
            <div className="h-48 p-2 border-2 border-t-w95-darkgrey border-l-w95-darkgrey border-r-w95-white border-b-w95-white shadow-w95-panel overflow-y-auto space-y-2 bg-w95-white">
              {savedPrompts.length > 0 ? (
                savedPrompts.map(prompt => (
                  <div key={prompt.id} className="p-2 border border-w95-darkgrey shadow-w95-panel-raised bg-w95-silver">
                    <h3 className="font-bold truncate">{prompt.title}</h3>
                    <p className="text-xs truncate">{prompt.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-w95-darkgrey">No prompts saved yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
