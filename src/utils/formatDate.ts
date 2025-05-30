export const formatDateDisplay = (
  date: Date | string | number | undefined
): string => {
  if (!date) return "";

  let dateObj: Date;

  // Convert to proper Date object if it's not already one
  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else if (typeof date === "number") {
    dateObj = new Date(date);
  } else {
    return "Invalid date";
  }

  // Verify the date is valid
  if (isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  return dateObj.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
};

export const formatDateForInput = (
  date: Date | string | number | undefined
): string => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  return dateObj.toISOString().split("T")[0];
};

export const createDateFromString = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};

export const isDateValid = (date: Date | string | number): boolean => {
  if (!date) return false;
  const dateObj = date instanceof Date ? date : new Date(date);
  return !isNaN(dateObj.getTime());
};
