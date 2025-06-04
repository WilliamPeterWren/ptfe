import { differenceInMonths, parseISO, differenceInDays } from "date-fns";

export const calculateDuration = (dateString) => {
  const fromDate = parseISO(dateString);
  const toDate = new Date();
  const totalMonths = differenceInMonths(toDate, fromDate);
  const totalDays = differenceInDays(toDate, fromDate);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0) {
    return `${years} năm, ${months} tháng`;
  } else if (months > 0) {
    return `${months} tháng ${totalDays} ngày`;
  } else {
    return `${totalDays} ngày`;
  }
};
