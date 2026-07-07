import React from "react";
import contentData from "../data/content.json";

const Resources = () => {
  const { resources } = contentData;
  return (
    <div className="px-[1.15rem] py-12 lg:px-12">
      <p className="text-accent text-[0.72rem] tracking-[0.34em] uppercase mb-4">
        {" "}
        {resources.eyebrow}
      </p>
      <h1 className="font-sans text-5xl uppercase tracking-wide">
        {resources.title}
      </h1>
    </div>
  );
};

export default Resources;
