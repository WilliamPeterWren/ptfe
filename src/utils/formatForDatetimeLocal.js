// Convert ISO UTC string to local datetime-local format
const formatForDatetimeLocal = (isoString) => {
  const date = new Date(isoString);
  const pad = (n) => n.toString().padStart(2, "0");

  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
};

export default formatForDatetimeLocal;
