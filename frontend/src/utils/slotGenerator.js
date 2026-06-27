export const generateSlots = (start, end) => {
  const slotList = [];

  let [hour, minute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (hour < endHour || (hour === endHour && minute < endMinute)) {
    slotList.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    );

    minute += 30;

    if (minute >= 60) {
      hour++;
      minute = 0;
    }
  }

  return slotList;
};
