// import { format, type DateArg } from 'date-fns'; 


// export function formatDate(date: DateArg<Date>) {
//   return format(date, 'dd MMM yyyy h:mm a')
// }


import { format } from "date-fns";

export function formatDate(date: unknown) {
  if (!date) return "";

  const d =
    date instanceof Date
      ? date
      : typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : null;

  if (!d || isNaN(d.getTime())) return "";

  return format(d, "dd MMM yyyy h:mm a");
}


