import React from "react";

const Footer = ({ layout, onFooterClick }) => {
  return (
    <footer className="border-t border-border bg-bg p-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Branding/Click area */}
        <div className="flex flex-col gap-2">
          <span 
            onClick={onFooterClick}
            className="cursor-default select-none font-sans text-2xl uppercase tracking-widest text-text"
          >
            CODE<span className="text-accent">X</span>
          </span>
          <p className="text-xs text-text-muted font-mono uppercase tracking-widest">
            {layout.footerText.replace("2026", new Date().getFullYear())}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex md:justify-end items-end gap-6">
          {layout.socials.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-sans uppercase tracking-[0.2em] hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;