import React from "react";
import Button from "../../../components/common/Button";
import contentData from "../../../data/content.json";

const MissionSection = () => {
  const { mission } = contentData.landing;

  return (
    <section
  id="vision"
  className="border-b border-border bg-bg relative overflow-hidden"
>
  <div className="max-w-[1400px] mx-auto px-4 lg:px-12 py-16 lg:py-24">

    <div className="rounded-3xl border border-border bg-card shadow-brutal">

      <div className="grid lg:grid-cols-[1fr_240px] gap-12 p-8 lg:p-14">

        <div>
          <p className="eyebrow mb-5">
            {mission.eyebrow}
          </p>

          <h2 className="font-serif text-[clamp(2rem,4vw,3.7rem)] leading-tight mb-8 text-text">
            {mission.headline}
          </h2>

          <p className="text-text-muted leading-8 max-w-3xl">
            {mission.description}
          </p>
        </div>

        <div className="flex items-end">
          <Button
            to="/about"
            variant="outline"
            className="button w-full"
          >
            {mission.cta}
          </Button>
        </div>

      </div>

    </div>
  </div>
</section>
  );
};

export default MissionSection;
