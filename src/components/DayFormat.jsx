import React from "react";

const DayFormat = (isoString) => {
  const date = new Date(isoString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();

  // Construct the formatted date string
  const formattedDate = `${month} ${day}`;
  return formattedDate;
};

export default DayFormat;
