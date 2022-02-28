const screens = {
  phone: "600px",
  laptop: "1024px",
  desktop: "1270px",
};

const colors = {
  "primary-1": "#33CCCC",
  "primary-2": "#7562BD",
  "primary-3": "#FFFFFF",
  accent: "#F53838",
  "sematic-1": "#E40F0A",
  "sematic-2": "#FFCF5C",
  "sematic-3": "#38AE0E",
  "neutral-1": "#1B1B1B",
  "neutral-2": "#646464",
  "neutral-3": "#B1B1B1",
  "neutral-4": "#EEEEEE",
  "neutral-5": "#F8F8F8",
  "b-1": "#EFFAFA", // background-1
  "b-2": "#F6F6FB",
  "b-3": "#3D3733",
  light: "#A3E8E8",
  transparent: "rgba(0,0,0,0)",
  table: "rgba(0,0,0,.1)",
  blue: "#3754DB",
  logo: "#4769AB",
};

const fontSize = {
  DEFAULT: "16px",
  xs: "12px",
  sm: "13px",
  md: "14px",
  lg: "16px",
  xl: "18px",
  xxl: "22px",
  20: "20px",
  "3xl": "24px",
  "3xxl": "26px",
  "4xl": "28px",
  "5xl": "36px",
  "6xl": "48px",
};

const renderSpacings = () => {
  const spacing = {
    full: "100%",
    fit: "fit-content",
  };
  // 0px --> 100px | 0px 5px 10px 15px,...
  for (let i = 0; i < 10; i += 0.5) {
    spacing[i] = `${i * 10}px`;
  }
  // 100px --> 1000px | 100px 110px 120px,...
  for (let i = 10; i < 100; i++) {
    spacing[i] = `${i * 10}px`;
  }
  return spacing;
};

const spacing = renderSpacings();

const fontWeight = {
  DEFAULT: 400,
  hairline: 100,
  "extra-light": 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  "extra-bold": 800,
  black: 900,
};
const boxShadow = {
  md: "-8px -8px 16px rgba(177, 177, 177, 0.12), 8px 8px 16px rgba(177, 177, 177, 0.12)",
  lg: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  "as-border":
    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
};

const borderRadius = {
  tn: "2px", // tiny
  sm: "4px", // small
  md: "5px", // medium
  lg: "8px",
  xl: "10px",
  xxl: "15px",
};

const zIndex = {
  "-1": "-1",
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40", // for drawer
  50: "50", // for Tooltip
  100: "100", // for Dialog, FullScreenDialog...
};

module.exports = {
  purge: ["./src/**/*.tsx", "!**/*.stories.tsx"],
  darkMode: false,
  theme: {
    screens,
    colors,
    fontSize,
    spacing,
    fontWeight,
    boxShadow,
    zIndex,
    maxWidth: {
      ...screens,
      ...spacing,
    },
    extend: {
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "1fr-auto": "1fr auto",
      },
      borderRadius,
    },
  },
  variants: {
    border: ["last"],
    extend: {
      borderColor: ["group-focus"],
      visibility: ["group-focus"],
      display: ["group-hover"],
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
  ],
};
