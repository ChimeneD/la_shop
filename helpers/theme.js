import Cookies from "js-cookie";

export const getCurrentTheme = () => {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  Cookies.get("darkMode") === "ON" ? (theme = "dark") : (theme = "light");
  return theme;
};

export const loadTheme = (theme) => {
  const root = document.querySelector(":root");
  if (theme === "light") {
  }
  root.setAttribute("color-scheme", `${theme}`);
};
