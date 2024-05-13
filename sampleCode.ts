import { I18nManager } from "react-native";
import moment from "moment";
import { IFormattedMonth } from "types";
import { appendEmptyFormattedDayList } from "actions";

export const prepareMonths = (initialDate: string, finalDate: string) => {
  const initialDateObject = moment(initialDate, "YYYY-MM-DD");
  const finalDateObject = moment(finalDate, "YYYY-MM-DD");
  const daysCount = finalDateObject.diff(initialDateObject, "days");

  const days: IFormattedMonth[] = [];
  let monthIndex = 0;
  for (let i = 0; i <= daysCount; i += 1) {
    const day = moment(initialDate, "YYYY-MM-DD").add(i, "days");
    const startOfMonth = day.clone().startOf("month").format("YYYY-MM-DD");
    if (startOfMonth === day.format("YYYY-MM-DD")) {
      days.push({
        title: moment(day)
          .locale(I18nManager.isRTL ? "ar" : "en")
          .format("MMM"),
        data: [],
      });
      monthIndex += 1;
      const emptyDayCountToAddMiddle = moment(day, "YYYY-MM-DD");

      appendEmptyFormattedDayList(days, monthIndex, emptyDayCountToAddMiddle);
    }
  }

  return days;
};
