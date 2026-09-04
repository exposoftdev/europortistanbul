import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      data-testid="theme-toggle"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
      className="relative inline-flex h-9 w-[76px] items-center rounded-full border border-border bg-muted px-1 transition-colors duration-300"
    >
      <span
        className={`absolute h-7 w-7 rounded-full bg-primary text-primary-foreground grid place-items-center transition-transform duration-500 ease-[var(--ease-out-expo)] ${dark ? "translate-x-[38px]" : "translate-x-0"}`}
      >
        {dark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest w-full flex justify-between px-1.5 text-muted-foreground">
        <span className={dark ? "" : "opacity-0"}>Dk</span>
        <span className={dark ? "opacity-0" : ""}>Lt</span>
      </span>
    </button>
  );
};
