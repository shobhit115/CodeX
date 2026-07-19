import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import the new component
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
      <Navbar layout={layout} />

      {/* Ticker Section */}
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

      <Footer layout={layout} onFooterClick={handleFooterClick} />
    </div>
  );
};

export default MainLayout;