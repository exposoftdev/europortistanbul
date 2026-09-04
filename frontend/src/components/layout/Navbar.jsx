import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { ThemeToggle } from "./ThemeToggle";
import { RegisterLink } from "@/components/site/Blocks";
import { track } from "@/lib/track";

export const NAV = [
  ["/exhibition", "Exhibition"], ["/exhibit", "Exhibit"], ["/visit", "Visit"], ["/exhibitors", "Exhibitors"],
  ["/programme", "Programme"], ["/news", "News"], ["/partners", "Partners"], ["/contact", "Contact"],
];

export const Navbar = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const logo = theme === "dark" ? "/logo-europort-istanbul-white.png" : "/logo-europort-istanbul-navy.png";

  return (
    <header data-testid="main-navbar" className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        <Link to="/" data-testid="nav-logo" className="flex items-center shrink-0"><img src={logo} alt="Europort Istanbul 2026" className="h-10 sm:h-11 w-auto" /></Link>
        <nav className="hidden xl:flex items-center gap-7">
          {NAV.map(([to, label]) => (
            <NavLink key={to} to={to} data-testid={`nav-${label.toLowerCase()}`} className={({ isActive }) => `text-sm font-bold tracking-wide transition-colors duration-300 hover:text-periwinkle ${isActive ? "text-periwinkle" : "text-foreground/80"}`}>{label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/exhibit/enquiry" data-testid="nav-cta" onClick={() => track("stand_enquiry_start", { cta_id: "nav" })} className="btn-signal hidden md:inline-flex h-10">Book your stand</Link>
          <button type="button" data-testid="nav-menu-toggle" aria-label="Menu" onClick={() => setOpen((o) => !o)} className="xl:hidden h-10 w-10 grid place-items-center rounded-md border border-border">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div data-testid="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="xl:hidden border-t border-border bg-background">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid sm:grid-cols-2 gap-1">
              {NAV.map(([to, label], i) => (
                <NavLink key={to} to={to} data-testid={`mobile-nav-${label.toLowerCase()}`} className="flex items-center justify-between py-3 border-b border-border font-bold text-lg hover:text-periwinkle transition-colors">
                  <span><span className="font-mono text-xs text-periwinkle mr-3">{String(i + 1).padStart(2, "0")}</span>{label}</span><ArrowUpRight size={16} />
                </NavLink>
              ))}
              <div className="sm:col-span-2 pt-5 flex flex-wrap gap-3">
                <RegisterLink content="mobile-menu" />
                <Link to="/brand" className="btn-secondary">Brand Hub</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
