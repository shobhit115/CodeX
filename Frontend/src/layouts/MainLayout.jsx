import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-lockup" aria-label="Codex home">
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-wordmark">CODEX</span>
        </div>

        <nav className="site-nav" aria-label="Primary">
          <a href="#about">[about]</a>
          <a href="#events">[events]</a>
          <a href="#team">[team]</a>
          <a href="#archive">[archive]</a>
        </nav>

        <div className="site-meta">
          <span>est. 2018</span>
          <span>vol.07</span>
          <a className="join-button" href="#join">
            join us
          </a>
        </div>
      </header>

      <div className="ticker-bar" aria-label="Codex focus areas">
        <div className="ticker-track">
          <span>hackathons</span>
          <span>open source</span>
          <span>pixel perfect</span>
          <span>protocol dev</span>
          <span>100+ members</span>
          <span>workshops</span>
          <span>hackathons</span>
          <span>open source</span>
          <span>pixel perfect</span>
        </div>
      </div>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;