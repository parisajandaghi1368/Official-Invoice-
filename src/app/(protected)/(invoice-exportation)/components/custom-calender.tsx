import { Stack, TextInput } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { Calendar, CalendarProvider } from "zaman";

import { replacePersianNumbers } from "../tools/converter-functions";
interface CalenderParams {
  date: Date;
  setDate: (date: Date) => void;
  label: string;
  className: string;
  disable?: boolean;
}
export default function CustomCalendar({
  date,
  setDate,
  label,
  className,
  disable,
}: CalenderParams) {
  const [showCalendar, setShowCalendar] = useState(false);
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat("fa-IR"), []);

  const calendarContainerRef = useClickOutside(() => setShowCalendar(false));

  return (
    <CalendarProvider locale="fa" direction="rtl">
      <Stack pos="relative" ref={calendarContainerRef}>
        <TextInput
          disabled={disable}
          label={label}
          value={dateFormatter.format(date)}
          onClick={() => {
            setShowCalendar((s) => !s);
          }}
        ></TextInput>

        {showCalendar && (
          <Calendar
            onChange={(e) => {
              setShowCalendar(false);
              setDate(e.value);
            }}
            defaultValue={date}
            weekends={[6]}
            className={className}
          />
        )}
      </Stack>
    </CalendarProvider>
  );
}
export function DateFormatter(date: Date) {
  let convertedDate = date.toLocaleDateString("fa-IR").split("/").join("-");

  const parts = convertedDate.split("-");

  if (parts[1].length === 1) {
    parts[1] = "0" + parts[1];
  }
  if (parts[2].length === 1) {
    parts[2] = "0" + parts[2];
  }
  convertedDate = parts.join("-");

  return replacePersianNumbers(convertedDate);
}
