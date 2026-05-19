const Home = () => {
  const modules = [
    {
      id: '01',
      module: 'module_01: events_manager',
      status: 'status: online',
      title: 'Upcoming Events',
      description:
        'Workshops, hackathons, and seminars engineered for high-performance learning. Cross-disciplinary. Real impact.',
    },
    {
      id: '02',
      module: 'module_02: repository_viewer',
      status: 'status: read_only',
      title: 'Project Showcase',
      description:
        'Open-source builds, pixel-perfect UIs, and production-grade systems built by collective members.',
    },
    {
      id: '03',
      module: 'module_03: personnel_db',
      status: 'status: encrypted',
      title: 'Meet The Team',
      description:
        'Engineers, designers, and researchers bridging the gap between abstract logic and hardware reality.',
    },
  ];

  const benefits = [
    'Access to a 100+ member collaborative network',
    'Hands-on protocol development sessions',
    'Direct mentorship from senior engineers',
    'Pixel-perfect UI architecture workshops',
    'Annual hackathon with real industry exposure',
    'Open-source project contributions and live deployments',
  ];

  const stats = [
    {
      label: 'workshops_executed',
      value: '24+',
      text: 'Hands-on sessions from low-level systems to UI architecture.',
    },
    {
      label: 'units_synchronized',
      value: '500+',
      text: 'Students and professionals under one technical collective.',
    },
    {
      label: 'production_deployments',
      value: '10+',
      text: 'Real-world systems built and shipped by collective members.',
    },
  ];

  return (
    <div className="home-page">
      <section className="hero-panel" id="about">
        <div className="hero-copy">
          <p className="eyebrow">init sequence complete // active status</p>
          <h1 className="hero-title">
            <span>CODE</span>
            <span className="hero-accent">X</span>
          </h1>
          <p className="hero-quote">"Engineering the future, code by code."</p>
          <p className="hero-description">
            A high-frequency technical collective focused on protocol development,
            pixel-perfect UI architecture, and computational excellence.
          </p>

          <div className="hero-actions" id="join">
            <a className="button button--solid" href="#events">
              explore events
            </a>
            <a className="button button--outline" href="#team">
              learn more
            </a>
          </div>
        </div>

        <aside className="hero-stats" aria-label="Codex metrics">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-text">{stat.text}</p>
            </article>
          ))}
        </aside>
      </section>

      <section className="modules-section" id="events">
        <div className="section-heading">
          <p className="section-kicker">sys modules</p>
          <h2 className="section-title">Operational blocks for the collective</h2>
        </div>

        <div className="module-list">
          {modules.map((module) => (
            <article className="module-row" key={module.id}>
              <div className="module-index">{module.id}</div>
              <div className="module-copy">
                <p className="module-meta">
                  {module.module} - {module.status}
                </p>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section" id="team">
        <div className="split-left">
          <p className="eyebrow">auth_required</p>
          <h2 className="split-title">Write the next chapter.</h2>
          <p className="split-copy">
            We are looking for high-performance individuals to bridge the gap between
            abstract logic and hardware reality. Ready to commit?
          </p>

          <a className="button button--solid button--wide" href="#archive">
            execute: join_us[]
          </a>
        </div>

        <div className="split-right" id="archive">
          <p className="split-kicker">// why codex?</p>
          <ul className="split-list">
            {benefits.map((benefit) => (
              <li className="split-item" key={benefit}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;

