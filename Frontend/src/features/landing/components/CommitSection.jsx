import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import contentData from "../../../data/content.json";

const CommitSection = () => {
  const navigate = useNavigate();
  const { commitSection } = contentData.landing;
  return (
    <section className="border-b border-border grid grid-cols-1 lg:grid-cols-2" id="team">
      <div className="min-h-[31rem] px-[1.15rem] py-[3.1rem] lg:p-[3.1rem]">
        <p className="m-0 text-accent text-[0.72rem] tracking-[0.34em] uppercase">{commitSection.eyebrow}</p>
        <h2 className="mt-[1.2rem] mb-[1.5rem] max-w-[11ch] font-sans text-[clamp(4rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em] uppercase">{commitSection.title}</h2>
        <p className="m-0 text-text-muted text-[0.93rem] leading-[1.75] max-w-[32rem] mb-8">{commitSection.description}</p>
        <Button
          onClick={() => navigate("/register")}
          variant="solid"
          className="w-full lg:w-auto py-[0.95rem] px-[1.4rem] lg:ml-2 bg-text text-text-inverse font-sans text-base tracking-[0.18em] uppercase hover:bg-text/90 hover:-translate-y-[1px] transition-transform m-0 lg:ml-4"
        >
          Join Now
        </Button>
      </div>
      <div className="min-h-[31rem] px-[1.15rem] py-[3.1rem] lg:p-[3.1rem] bg-panel text-text-inverse border-t lg:border-t-0 lg:border-l border-border" id="archive">
        <p className="m-0 text-accent text-[0.72rem] tracking-[0.34em] uppercase text-accent/80 mb-[2.1rem]">{commitSection.kicker}</p>
        <ul className="list-none p-0 m-0">
          {commitSection.benefits.map((benefit) => (
            <li className="m-0 text-text-muted text-[0.93rem] leading-[1.75] relative py-4 pl-[1.35rem] border-t border-border-soft text-text-inverse/75 last:border-b before:content-['↳'] before:absolute before:left-0 before:text-accent" key={benefit}>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CommitSection;
