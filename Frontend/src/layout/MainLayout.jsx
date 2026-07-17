import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import contentData from "../data/content.json";

const MainLayout = () => {
  const navigate = useNavigate();
  const [footerClicks, setFooterClicks] = useState(0);
  const { layout } = contentData;

  const handleFooterClick = () => {
    const newCount = footerClicks + 1;
    setFooterClicks(newCount);
    if (newCount >= 5) {
      navigate("/admin/login");
      setFooterClicks(0);
    }
  };

  return (
    <div className="app-shell">
      {/* 1. Inject the new Navbar here */}
      <Navbar layout={layout} />

      <div className="border-b border-border bg-accent overflow-hidden">
        <div className="flex items-center gap-12 min-h-[2.5rem] px-4 whitespace-nowrap uppercase font-sans tracking-[0.28em] text-text-inverse">
          {layout.ticker.map((item, index) => (
            <span key={index} className="before:content-['+'] before:mr-[1.1rem]">{item}</span>
          ))}
        </div>
      </div>

      <main className="w-full max-w-[1400px] mx-auto flex-1 border-x border-border bg-bg-soft">
        <Outlet />
      </main>

      <footer className="border-t border-border p-6 font-mono text-xs text-text/40 text-center uppercase tracking-widest bg-bg">
        <span
          onClick={handleFooterClick}
          className="cursor-default select-none"
        >
          {layout.footerText.replace("2026", new Date().getFullYear())}
        </span>
      </footer>
    </div>
  );
};

export default MainLayout;
