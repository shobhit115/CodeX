import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import Button from "../components/common/Button";
import { useTheme } from "../hooks/useTheme";

const Navbar = ({ layout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Close mobile menu automatically when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border flex items-center justify-between w-full min-h-[4.25rem] shadow-sm">
      
      {/* 1. Brand Lockup */}
      <Link
        to="/"
        className="flex items-center gap-3 px-4 lg:px-5 lg:border-r border-border h-[4.25rem] shrink-0 hover:bg-card-hover/30 transition-colors"
        aria-label="CodeX Club home"
      >
        <img
          src="/codex-logo-icon.svg"
          alt="CodeX Club logo"
          className="h-8 w-8 md:h-9 md:w-9 shrink-0"
        />
        <span
          className="hidden sm:block w-px h-6 bg-border-soft"
          aria-hidden="true"
        />
        <img
          src="/university-logo-icon.svg"
          alt="Quantum University logo"
          className="h-6 w-6 md:h-7 md:w-7 shrink-0 hidden sm:block"
        />
        <span className="font-sans text-[1.35rem] md:text-[1.55rem] tracking-[0.24em] leading-none hover:text-accent transition-colors">
          CODEX
        </span>
      </Link>

      {/* 2. Desktop Navigation (FIXED: justify-center aligns it perfectly in the middle) */}
      <nav className="hidden lg:flex items-center justify-center flex-1 h-[4.25rem] overflow-hidden">
        {layout.nav.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="h-full inline-flex items-center px-4 lg:px-[1.65rem] border-l border-border-soft text-text-muted text-[0.78rem] tracking-[0.3em] uppercase hover:text-text hover:bg-card-hover/50 transition-colors whitespace-nowrap first:border-l-0"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* 3. Meta, Desktop CTA, and Mobile Toggle Container */}
      <div className="flex items-center h-[4.25rem] pl-2 lg:pl-0 lg:border-l border-border shrink-0">
        
        {/* Meta Kicker - Hidden below XL screens to save space */}
        <span className="hidden xl:inline-block px-5 border-r border-border-soft text-text-muted text-[0.75rem] tracking-[0.22em] uppercase whitespace-nowrap">
          {layout.meta}
        </span>

        {/* Theme Toggle - Visible Everywhere */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 mx-2 lg:mx-4 text-text-muted hover:text-text hover:bg-card-hover rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent flex items-center justify-center shrink-0"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* DESKTOP CTA BUTTON (FIXED: Swapped text-text-inverse for text-bg to fix dark mode contrast) */}
        <Button
          onClick={() => navigate("/register")}
          variant="solid"
          className="hidden lg:flex items-center justify-center h-[4.25rem] px-8 m-0 rounded-none border-y-0 border-r-0 border-l border-border bg-text text-bg font-sans text-[0.9rem] tracking-[0.18em] uppercase hover:bg-text-muted hover:text-bg transition-colors"
        >
          {layout.cta}
        </Button>

        {/* MOBILE HAMBURGER TOGGLE: Visible below LG breakpoint */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-14 h-[4.25rem] border-l border-border hover:bg-card-hover transition-colors focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-current transition-all duration-300 origin-center ${
              isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-current transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0 translate-x-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-current transition-all duration-300 origin-center ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-bg/95 backdrop-blur-md border-b border-border transition-all duration-300 ease-in-out overflow-hidden shadow-brutal ${
          isMobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col">
          {layout.nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="w-full px-6 py-4 border-b border-border-soft text-text-muted hover:text-text hover:bg-card-hover hover:pl-8 transition-all font-sans text-sm tracking-[0.2em] uppercase"
            >
              {item.label}
            </Link>
          ))}

          {/* MOBILE CTA BUTTON */}
          <div className="p-6 bg-bg-soft">
            <Button
              onClick={() => navigate("/register")}
              variant="solid"
              className="w-full flex justify-center items-center py-4 font-sans text-sm tracking-[0.2em] uppercase bg-text text-bg hover:bg-text-muted hover:text-bg"
            >
              {layout.cta}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;