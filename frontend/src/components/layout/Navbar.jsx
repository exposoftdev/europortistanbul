import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@/lib/theme";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Preview", id: "nav-home" },
  { to: "/brand", label: "Brand Hub", id: "nav-brand" },
  { to: "/report", label: "Strategy Report", id: "nav-report" },
];

export const Navbar = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-europort-istanbul-white.png" : "/logo-europort-istanbul-navy.png";
  return (
    <header data-testid="main-navbar" className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        <Link to="/" data-testid="nav-logo" className="flex items-center shrink-0">
          <img src={logo} alt="Europort Istanbul 2026" className="h-10 sm:h-11 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={l.id}
              className={({ isActive }) =>
                `text-sm font-bold tracking-wide transition-colors duration-300 hover:text-periwinkle ${isActive ? "text-periwinkle" : "text-foreground/80"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#stand" data-testid="nav-cta" className="btn-signal hidden sm:inline-flex h-10">Book your stand</a>
        </div>
      </div>
    </header>
  );
};
