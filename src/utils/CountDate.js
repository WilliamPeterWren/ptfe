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

export const calculateDurationReverse = (dateString) => {
  const fromDate = parseISO(dateString);
  const toDate = new Date();
  const totalMonths = differenceInMonths(fromDate, toDate);
  const totalDays = differenceInDays(fromDate, toDate);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const days = totalDays % 30;

  if (years > 0) {
    return `${years} năm, ${months} tháng`;
  } else if (months > 0) {
    return `${months} tháng ${days} ngày`;
  } else {
    return `${days} ngày`;
  }
};
