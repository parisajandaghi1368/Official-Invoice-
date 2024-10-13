import { Calendar, CalendarProvider } from "zaman";
import { useMemo, useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import { Stack, TextInput, rem } from "@mantine/core";

import { replacePersianNumbers } from "../tools/converter-functions";
interface CalenderParams {
  date: Date;
  setDate: (date: Date) => void;
  label: string;
  className: string;
}
export default function CustomCalendar({
  date,
  setDate,
  label,
  className,
}: CalenderParams) {
  const [showCalendar, setShowCalendar] = useState(false);
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat("fa-IR"), []);

  const calendarContainerRef = useClickOutside(() => setShowCalendar(false));

  return (
    <CalendarProvider locale="fa" direction="rtl">
      <Stack pos="relative" ref={calendarContainerRef}>
        <TextInput
          w={rem(258)}
          h={rem(36)}
          label={label}
          value={dateFormatter.format(date)}
          // className="w-[280px] h-[36px] flex items-center cursor-pointer border-[#CFD8DC] rounded-lg p-2"
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
