export const getSettings = () => {
  return JSON.parse(localStorage.getItem("settings"));
};

export const setThemeMode = (mode = "white") => {
  document.documentElement.setAttribute("data-theme", mode);
};
