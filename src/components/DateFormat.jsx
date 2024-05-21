import React from "react";

const DateFormat = (isoString) => {
  const date = new Date(isoString);

  let hours = date.getUTCHours() + 1;
  const minutes = date.getUTCMinutes();

  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  const formattedTime = `${hours}:${minutesStr}${ampm}`;
  return formattedTime;
};

export default DateFormat;
