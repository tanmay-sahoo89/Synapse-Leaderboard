/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyan-neon": "#00e5ff",
        "cyan-soft": "#1ee0c6",
        "purple-neon": "#cc00ff",
        "gold-bright": "#ffd700",
        "navy-deep": "#0a0e27",
        "orange-neon": "#ff6b35",
      },
      boxShadow: {
        "glow-cyan":
          "0 0 10px rgba(0, 229, 255, 0.5), 0 0 20px rgba(0, 229, 255, 0.3)",
        "glow-cyan-intense":
          "0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.5)",
        "glow-purple":
          "0 0 10px rgba(204, 0, 255, 0.5), 0 0 20px rgba(204, 0, 255, 0.3)",
        "glow-purple-intense":
          "0 0 20px rgba(204, 0, 255, 0.8), 0 0 40px rgba(204, 0, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
