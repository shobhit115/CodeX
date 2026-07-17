import contentData from "../../../data/content.json";

const Domains = () => {
  const { domains } = contentData?.landing || {};

  if (!domains || !domains.list) return null;

  return (
    <section
      className="border-b domains-panel relative overflow-hidden py-16 md:py-24"
      id="domains"
    >
      <div className="section-header mb-12 text-center relative z-10">
        <p className="m-0 text-accent text-[0.72rem] tracking-[0.34em] uppercase">{domains.eyebrow}</p>
        <h2 className="mt-4 lg:mt-6 mb-8 flex items-end gap-[0.3rem] font-sans text-[clamp(6rem,18vw,14rem)] leading-[0.88] tracking-[0.02em] text-reflect mb-4">
          <span>{domains.titlePart1} </span>
          <span className="text-accent">{domains.titlePart2}</span>
        </h2>
        <p className="m-0 text-text-muted text-[0.93rem] leading-[1.75] max-w-[36rem] max-w-2xl mx-auto">
          {domains.description}
        </p>
      </div>

      <div className="domains-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {domains.list.map((domain, index) => (
          <article
            key={domain.title || index}
            className="flex flex-col justify-center p-8 bg-card/40 backdrop-blur-md rounded-2xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
          >
            <div>
              {/* Optional: You can add an index counter like 01, 02 to match SystemModules */}
              <p className="m-0 text-accent text-[0.72rem] tracking-[0.34em] uppercase mb-2 text-xs opacity-50">
                {`domain_0${index + 1}`}
              </p>
              <h3 className="mt-[0.45rem] mb-[0.8rem] font-sans text-[clamp(4rem,6vw,7rem)] leading-[0.92] tracking-[0.02em] text-xl mb-3">{domain.title}</h3>
              <p className="m-0 text-text-muted text-[0.93rem] leading-[1.75] text-sm leading-relaxed text-text-text-muted">
                {domain.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Domains;
