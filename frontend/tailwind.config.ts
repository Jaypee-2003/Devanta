import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        devanta: {
          ink: "#0b0f1a",
          night: "#0f172a",
          violet: "#7c3aed",
          fuchsia: "#d946ef",
          cyan: "#22d3ee",
          amber: "#fbbf24",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-hero":
          "radial-gradient(ellipse 110% 85% at 10% 5%, rgba(124,58,237,0.55), transparent 52%), radial-gradient(ellipse 90% 70% at 92% 8%, rgba(217,70,239,0.42), transparent 48%), radial-gradient(ellipse 100% 60% at 50% 100%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(ellipse 55% 45% at 65% 42%, rgba(99,102,241,0.18), transparent 50%), radial-gradient(ellipse 40% 30% at 30% 70%, rgba(244,114,182,0.1), transparent 45%)",
        "landing-shine":
          "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.03) 45%, rgba(167,139,250,0.08) 50%, rgba(255,255,255,0.03) 55%, transparent 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(28px, -18px) scale(1.04)" },
          "66%": { transform: "translate(-22px, 12px) scale(0.96)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.75" },
        },
      },
      animation: {
        float: "float 20s ease-in-out infinite",
        "float-slow": "float 26s ease-in-out infinite reverse",
        "float-delayed": "float 22s ease-in-out infinite 3s",
        "pulse-soft": "pulse-soft 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
