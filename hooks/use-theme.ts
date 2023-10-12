import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(
    localStorage.getItem("theme") === "dark"
      ? "dark"
      : localStorage.getItem("theme") === "light"
      ? "light"
      : "system",
  );

  useEffect(() => {
    if (theme === "dark") {
      // explicitly set dark mode
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      // explicitly set light mode
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
      // explicity or implicitly set auto mode
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}