import React from 'react';
import { modules } from '../../../constants/landingData';

const SystemModules = () => {
  return (
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
  );
};

export default SystemModules;