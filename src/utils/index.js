export const getSettings = () => {
  return JSON.parse(localStorage.getItem("settings"));
};
