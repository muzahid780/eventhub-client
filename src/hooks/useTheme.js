import { useTheme } from "../contexts/ThemeContext";
export const useThemeToggle = () => {
  const { darkMode, toggleTheme, setThemeMode, getTheme, isDarkMode } =
    useTheme();

  return {
    isDarkMode: darkMode,
    toggleTheme,
    setThemeMode,
    getTheme,
    isDarkMode,
  };
};

export const useIsDarkMode = () => {
  const { darkMode } = useTheme();
  return darkMode;
};

export const useThemeClasses = () => {
  const { darkMode } = useTheme();

  return {
    bg: darkMode ? "bg-gray-900" : "bg-gray-50",
    text: darkMode ? "text-white" : "text-gray-900",
    card: darkMode ? "bg-gray-800" : "bg-white",
    border: darkMode ? "border-gray-700" : "border-gray-200",
    input: darkMode ? "dark:bg-gray-700 dark:border-gray-600" : "",
  };
};
