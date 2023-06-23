import React from "react";
import { useMemo } from "react";
import { IoMdArrowDropdown } from "@react-icons/all-files/io/IoMdArrowDropdown";
import "./Diagram.scss";

const Diagram = ({ energy, userBmr }) => {
  const calculatePercent = () => {
    const referenceEnergy = userBmr ? +userBmr : 2000;
    return (+energy / referenceEnergy) * 100;
  };

  let percent = useMemo(calculatePercent, [energy, userBmr]);

  if (percent > 100) {
    percent = 100;
  }

  return (
    <div className="diagram">
      <div className="diagram__inner">
        <div
          className="diagram__score"
          style={{ left: percent.toFixed(2) + "%" }}
        >
          <span>{percent.toFixed(2)}%</span>
          <IoMdArrowDropdown size={22} />
        </div>
        <div className="diagram__rails">
          <div
            className="diagram__progress"
            style={{ width: percent.toFixed(2) + "%" }}
          ></div>
        </div>
      </div>
      <span className="diagram__requirment">{`* ${percent.toFixed(
        2
      )} % daily caloric requirement for ${userBmr ? "you" : "an adult"}${
        userBmr ? " - " + userBmr + " kcl" : ""
      }`}</span>
    </div>
  );
};

export default Diagram;
