import React from "react";
import Button from "../../../components/common/Button";
import contentData from "../../../data/content.json";

const HeroSection = () => {
  const { hero } = contentData.landing;
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-[1.65fr_0.95fr] min-h-[calc(100vh-6.75rem)] border-b border-border relative overflow-hidden" id="about">
        <div className="ambient-glow w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] bottom-[-10%] left-[-10%] lg:left-[-5%] z-0"></div>
        <div className="px-[1.15rem] pt-[3.4rem] pb-[4rem] lg:px-12 lg:pt-28 relative z-10">
          <p className="m-0 text-accent text-[0.72rem] tracking-[0.34em] uppercase">{hero.eyebrow}</p>
          <h1 className="mt-4 lg:mt-6 mb-8 flex items-end gap-[0.3rem] font-sans text-[clamp(6rem,18vw,14rem)] leading-[0.88] tracking-[0.02em] text-reflect mb-12">
            <span>{hero.titlePart1}</span>
            <span className="text-accent">{hero.titlePart2}</span>
          </h1>

          <p className="m-0 mb-4 font-serif text-[clamp(1.55rem,2vw,2.1rem)] italic text-text">{hero.quote}</p>
          <p className="m-0 text-text-muted text-[0.93rem] leading-[1.75] max-w-[36rem]">{hero.description}</p>

          <div className="flex flex-wrap gap-4 mt-9" id="join">
            <Button to="/events" variant="solid">
              {hero.ctaPrimary}
            </Button>
            <Button to="/team" variant="outline">
              {hero.ctaSecondary}
            </Button>
          </div>
        </div>

        <aside className="flex flex-col justify-center gap-6 p-[1.15rem] lg:p-8 border-t lg:border-t-0 lg:border-l border-border relative z-10" aria-label="Codex metrics">
          {hero.stats.map((stat) => (
            <article className="flex flex-col justify-center p-8 bg-card/40 backdrop-blur-md rounded-2xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]" key={stat.label}>
              <p className="m-0 text-accent text-[0.72rem] tracking-[0.34em] uppercase">{stat.label}</p>
              <p className="mt-[0.45rem] mb-[0.8rem] font-sans text-[clamp(4rem,6vw,7rem)] leading-[0.92] tracking-[0.02em]">{stat.value}</p>
              <p className="m-0 text-text-muted text-[0.93rem] leading-[1.75]">{stat.text}</p>
            </article>
          ))}
        </aside>
      </section>
    </>
  );
};

export default HeroSection;
