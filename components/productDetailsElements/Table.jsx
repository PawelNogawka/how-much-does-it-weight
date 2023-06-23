import React from "react";
import {
  vitamins as vitaminsReq,
  minerals as mineralsReq,
  nutrition as nutritionReq,
} from "@/data/dailyRequirment";
import "./Table.scss";

const Table = ({ data, photoWeight, user, mode }) => {
  const { standard } = data;

  const calculatePercentage = (amount, reference) => {
    return Math.round((amount / reference) * 100);
  };

  const formatNumber = (number) => {
    if (Number.isInteger(number)) {
      return number.toFixed(0);
    } else {
      return number.toFixed(2);
    }
  };

  const rows = standard.map((item, index) => {
    const { name, amount, unit } = item;
    let reference;

    switch (mode) {
      case "nutrition":
        reference = name === "energy" && user ? user.bmr : nutritionReq[name];
        break;
      case "vitamins":
        reference = vitaminsReq[name];
        break;
      case "minerals":
        reference = mineralsReq[name];
        break;
      default:
        reference = nutritionReq[name];
    }

    const adjustedAmount = amount * (photoWeight / 100);
    const percentage = calculatePercentage(adjustedAmount, reference);

    return (
      <div className="table__row" key={index}>
        <h3 className="table__name">{name}</h3>
        <span className="table__daily-percentage">{percentage} %</span>
        <span className="table__100g-value">
          {formatNumber(amount)} {unit}
        </span>
        <span className="table__photo-value">
          {formatNumber(adjustedAmount)} {unit}
        </span>
      </div>
    );
  });

  return (
    <div className="table">
      <div className="table__row table__row--header">
        <div className="table__name"></div>
        <span className="table__daily-recommended">*DR (photo)</span>
        <span className="table__100">100g</span>
        <span className="table__photo">{photoWeight}g</span>
      </div>
      {rows}
      <p className="table__info">
        {`*DR - daily requirement of ${mode} for ${
          user ? "you" : "an average adult"
        } `}
      </p>
    </div>
  );
};

export default Table;
