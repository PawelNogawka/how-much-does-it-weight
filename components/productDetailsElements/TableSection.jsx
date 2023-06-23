import React from "react";

import SectionHeading from "../uiElements/SectionHeading";
import Table from "./Table";

const TableSection = ({ id, mode, user, photoWeight, data }) => {
  return (
    <section id={id} className="section-padding full-width ">
      <SectionHeading subtitle={mode} title={`${mode} values table`} />
      <Table data={data} photoWeight={photoWeight} user={user} mode={mode} />
    </section>
  );
};

export default TableSection;
