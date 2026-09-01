/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "#004580",
          light: "#1A75CC",
        },
        brandOrange: {
          DEFAULT: "hsl(var(--brand-orange))",
          foreground: "hsl(var(--brand-orange-foreground))",
          dark: "#D96B0F",
          light: "#FF9C45",
        },
        brandGreen: {
          DEFAULT: "hsl(var(--brand-green))",
          foreground: "hsl(var(--brand-green-foreground))",
          dark: "#359020",
          light: "#5AC841",
        },
        brand: {
          orange: '#f36f21',
          blue: '#0077c8',
          green: '#3ebd37',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        '3xl': "1.75rem",
        '2xl': "1.25rem",
        xl: "1rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -1px rgba(15, 23, 42, 0.05)',
        'warm-md': '0 8px 24px -4px rgba(15, 23, 42, 0.07), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'warm-lg': '0 20px 40px -10px rgba(15, 23, 42, 0.09), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'glow-orange': '0 12px 28px -6px rgba(245, 130, 32, 0.4)',
        'glow-blue': '0 12px 28px -6px rgba(0, 92, 169, 0.35)',
        'glow-green': '0 12px 28px -6px rgba(67, 176, 42, 0.35)',
        'tactile-btn': '0 4px 0 0 rgba(0, 69, 128, 0.25)',
        'tactile-orange': '0 4px 0 0 rgba(217, 107, 15, 0.3)',
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
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tw-elements/plugin.cjs"),
  ],
};