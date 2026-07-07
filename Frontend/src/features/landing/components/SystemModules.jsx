import React from "react";
import contentData from "../../../data/content.json";

const SystemModules = () => {
  const { systemModules } = contentData.landing;
  return (
    <section className="modules-section" id="events">
      <div className="section-heading">
        <p className="section-kicker">{systemModules.eyebrow}</p>
        <h2 className="section-title">{systemModules.title}</h2>
      </div>

      <div className="module-list">
        {systemModules.modules.map((module) => (
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
