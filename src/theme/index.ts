const theme = {
  colors: {
    primary: "#6756FE",
    secondary: "#9DADBA",
    white: "#FFFFFF",
    gray: {
      300: "#CBCDCE",
      500: "#FDFEFF",
    },
  },
  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Roboto', sans-serif",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.9rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  container: {
    md: "1200px",
    sm: "920px",
    lg: "1400px",
    fluid: "100vw",
  },
};
export type FontSize = keyof typeof theme["fontSizes"];
export type ContainerSize = keyof typeof theme["container"];

export default theme;
