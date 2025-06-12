export default function getTimeDetails(isoString) {
  const date = new Date(isoString);

  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  const padZero = (num) => num.toString().padStart(2, "0");

  return `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
}
