/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['PixelatedSystem', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        pixel: ['PixelatedSystem', 'sans-serif'],
        mono: ['PixelMono', 'Courier New', 'monospace'],
      },
      colors: {
        // Classic W95 Colors (preserved)
        'w95-silver': 'rgb(192, 192, 192)',
        'w95-blue': 'rgb(0, 0, 128)',
        'w95-darkgrey': 'rgb(128, 128, 128)',
        'w95-grey': 'rgb(128, 128, 128)',
        'w95-white': 'rgb(255, 255, 255)',
        'w95-black': 'rgb(0, 0, 0)',
        
        // Fantasy Pixel Colors
        'mystic-purple': '#6B46C1',
        'mystic-purple-dark': '#553C9A',
        'ethereal-blue': '#3B82F6',
        'ethereal-blue-dark': '#2563EB',
        'enchanted-green': '#10B981',
        'enchanted-green-dark': '#059669',
        'fairy-pink': '#EC4899',
        'fairy-pink-dark': '#DB2777',
        'dragon-gold': '#F59E0B',
        'dragon-gold-dark': '#D97706',
        'shadow-dark': '#1F2937',
        'moonlight-silver': '#E5E7EB',
        'starlight-white': '#F9FAFB',
        
        // Semantic colors mapped to fantasy palette
        border: 'rgb(128, 128, 128)',
        input: 'rgb(255, 255, 255)',
        ring: '#6B46C1',
        background: 'rgb(192, 192, 192)',
        foreground: 'rgb(0, 0, 0)',
        primary: {
          DEFAULT: '#6B46C1',
          foreground: 'rgb(255, 255, 255)',
        },
        secondary: {
          DEFAULT: 'rgb(192, 192, 192)',
          foreground: 'rgb(0, 0, 0)',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: 'rgb(255, 255, 255)',
        },
        muted: {
          DEFAULT: 'rgb(192, 192, 192)',
          foreground: 'rgb(128, 128, 128)',
        },
        accent: {
          DEFAULT: '#3B82F6',
          foreground: 'rgb(255, 255, 255)',
        },
        popover: {
          DEFAULT: 'rgb(192, 192, 192)',
          foreground: 'rgb(0, 0, 0)',
        },
        card: {
          DEFAULT: 'rgb(192, 192, 192)',
          foreground: 'rgb(0, 0, 0)',
        },
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      boxShadow: {
        // Classic W95 shadows
        'w95-button': 'inset -1px -1px rgb(0,0,0), inset 1px 1px rgb(255,255,255), inset -2px -2px rgb(128,128,128), inset 2px 2px rgb(192,192,192)',
        'w95-button-pressed': 'inset 1px 1px rgb(0,0,0), inset -1px -1px rgb(255,255,255), inset 2px 2px rgb(128,128,128), inset -2px -2px rgb(192,192,192)',
        'w95-panel': 'inset -1px -1px rgb(255,255,255), inset 1px 1px rgb(128,128,128)',
        'w95-panel-raised': 'inset -1px -1px rgb(128,128,128), inset 1px 1px rgb(255,255,255)',
        
        // Fantasy shadows
        'window': '4px 4px 8px rgba(0, 0, 0, 0.3), inset -1px -1px rgb(128,128,128), inset 1px 1px rgb(255,255,255)',
        'window-active': '4px 4px 12px rgba(107, 70, 193, 0.4), inset -1px -1px rgb(128,128,128), inset 1px 1px rgb(255,255,255)',
        'magical-glow': '0 0 20px rgba(107, 70, 193, 0.5)',
      },
      keyframes: {
        "window-open": {
          from: { 
            opacity: "0", 
            transform: "scale(0.8) translate(-50%, -50%)" 
          },
          to: { 
            opacity: "1", 
            transform: "scale(1) translate(-50%, -50%)" 
          },
        },
        "window-close": {
          from: { 
            opacity: "1", 
            transform: "scale(1)" 
          },
          to: { 
            opacity: "0", 
            transform: "scale(0.8)" 
          },
        },
        "magical-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(107, 70, 193, 0.5)" 
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(107, 70, 193, 0.8)" 
          },
        },
      },
      animation: {
        "window-open": "window-open 0.2s ease-out",
        "window-close": "window-close 0.2s ease-in",
        "magical-pulse": "magical-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
