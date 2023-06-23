"use client";

import "./SectionHeading.scss";

const SectionHeading = ({ center, title, desc, subtitle }) => {
  return (
    <div
      className={`${"section-heading"} ${center && "section-heading--center"}`}
    >
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
      <h2 className="section-heading__title">{title}</h2>
      {desc && <p className="section-heading__desc">{desc}</p>}
    </div>
  );
};

export default SectionHeading;
