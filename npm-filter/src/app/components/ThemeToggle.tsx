"use client";
/* Component to switch theme. used localstorage so it preserves after refresh */
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(
    global?.window?.localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkTheme]);

  return (
    <button
      className="float-right border-solid border m-2 p-1 rounded-full dark:border-white dark:text-white"
      onClick={() => setDarkTheme((p) => !p)}
    >
      Switch Theme
    </button>
  );
};

export default ThemeToggle;
