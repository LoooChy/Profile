/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "on-background": "#e2e0f6",
        "surface-dim": "#121221",
        "on-primary-fixed-variant": "#594400",
        "on-tertiary-fixed": "#1a1c1c",
        "primary-fixed-dim": "#f5bf00",
        "outline-variant": "#4f4632",
        "surface-container-low": "#1a1a2a",
        "surface-variant": "#333344",
        "surface-tint": "#f5bf00",
        "on-surface-variant": "#d2c5ab",
        tertiary: "#e5e5e5",
        "on-error": "#690005",
        "surface-bright": "#383848",
        "on-tertiary": "#2f3131",
        "surface-container": "#1e1e2e",
        "tertiary-fixed-dim": "#c6c6c7",
        "on-secondary-container": "#b7b8c1",
        "inverse-surface": "#e2e0f6",
        "surface-container-high": "#282939",
        "tertiary-fixed": "#e2e2e2",
        primary: "#ffe29f",
        "on-primary-container": "#695000",
        "on-surface": "#e2e0f6",
        "inverse-on-surface": "#2f2f3f",
        "primary-container": "#f8c100",
        "on-primary": "#3e2e00",
        surface: "#121221",
        "inverse-primary": "#765a00",
        "on-secondary-fixed": "#191c22",
        "on-error-container": "#ffdad6",
        background: "#121221",
        "surface-container-highest": "#333344",
        "secondary-fixed-dim": "#c5c6cf",
        outline: "#9b8f78",
        "on-secondary-fixed-variant": "#44474e",
        "on-secondary": "#2e3037",
        "surface-container-lowest": "#0c0d1c",
        "tertiary-container": "#c8c9c9",
        secondary: "#c5c6cf",
        "on-tertiary-fixed-variant": "#454747",
        "error-dim": "#a70138",
        "on-tertiary-container": "#535455",
        "tertiary-dim": "#005863",
        "primary-dim": "#0041c7",
        "on-primary-fixed": "#251a00",
        error: "#ffb4ab",
        "primary-fixed": "#ffdf95",
        "secondary-fixed": "#e1e2eb",
        "error-container": "#93000a",
        "secondary-container": "#474950",
        "secondary-dim": "#3d469f"
      },
      fontFamily: {
        headline: ["Newsreader", "serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Manrope", "sans-serif"],
        display: ["Newsreader", "serif"]
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      }
    }
  }
};
