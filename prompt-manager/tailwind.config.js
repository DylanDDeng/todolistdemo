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
        pixel: ['PixelatedSystem', 'sans-serif'], // Specific alias for the retro font
      },
      colors: {
        'w95-silver': 'rgb(192, 192, 192)',
        'w95-blue': 'rgb(0, 0, 128)',
        'w95-darkgrey': 'rgb(128, 128, 128)',
        'w95-grey': 'rgb(128, 128, 128)', // Alias for darkgrey
        'w95-white': 'rgb(255, 255, 255)',
        'w95-black': 'rgb(0, 0, 0)',

        // Shadcn UI semantic colors mapped to W95 palette
        border: 'rgb(128, 128, 128)', // w95-darkgrey
        input: 'rgb(255, 255, 255)',      // w95-white (for input background)
        ring: 'rgb(0, 0, 128)',        // w95-blue (for focus rings if any)
        background: 'rgb(192, 192, 192)', // w95-silver
        foreground: 'rgb(0, 0, 0)',       // w95-black
        primary: {
          DEFAULT: 'rgb(0, 0, 128)',   // w95-blue
          foreground: 'rgb(255, 255, 255)', // w95-white
        },
        secondary: {
          DEFAULT: 'rgb(192, 192, 192)',   // w95-silver (e.g., for buttons)
          foreground: 'rgb(0, 0, 0)',       // w95-black
        },
        destructive: {
          DEFAULT: "hsl(0 100% 50%)", // Standard red, W95 didn't have a strong destructive color by default
          foreground: 'rgb(255, 255, 255)', // w95-white
        },
        muted: {
          DEFAULT: 'rgb(192, 192, 192)',   // w95-silver
          foreground: 'rgb(128, 128, 128)', // w95-darkgrey (for muted text)
        },
        accent: {
          DEFAULT: 'rgb(0, 0, 128)',   // w95-blue
          foreground: 'rgb(255, 255, 255)', // w95-white
        },
        popover: {
          DEFAULT: 'rgb(192, 192, 192)', // w95-silver
          foreground: 'rgb(0, 0, 0)',       // w95-black
        },
        card: {
          DEFAULT: 'rgb(192, 192, 192)',   // w95-silver
          foreground: 'rgb(0, 0, 0)',       // w95-black
        },
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      boxShadow: {
        'w95-button': 'inset -1px -1px rgb(0,0,0), inset 1px 1px rgb(255,255,255), inset -2px -2px rgb(128,128,128), inset 2px 2px rgb(192,192,192)',
        'w95-button-pressed': 'inset 1px 1px rgb(0,0,0), inset -1px -1px rgb(255,255,255), inset 2px 2px rgb(128,128,128), inset -2px -2px rgb(192,192,192)',
        'w95-panel': 'inset -1px -1px rgb(255,255,255), inset 1px 1px rgb(128,128,128)',
        'w95-panel-raised': 'inset -1px -1px rgb(128,128,128), inset 1px 1px rgb(255,255,255)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
