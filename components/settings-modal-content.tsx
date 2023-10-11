import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";

export function SettingsModalContent() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="mt-4 flex items-center justify-between gap-8">
      <div>
        <h3 className="text-sm font-medium">Dark mode</h3>
        <p className="text-sm text-neutral-500">
          Dark mode is easier on your eyes and helps you focus on your work.
        </p>
      </div>
      <Switch
        checked={darkMode}
        onChange={setDarkMode}
        className={`${
          darkMode ? "bg-neutral-700" : "bg-neutral-300"
        } inline-flex h-6 w-12 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <span className="sr-only">Enable dark mode</span>
        <span
          aria-hidden="true"
          className={`${darkMode ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}