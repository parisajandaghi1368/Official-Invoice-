const englishNumber: string[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
const persianNumber: string[] = [
  "۰",
  "۱",
  "۲",
  "۳",
  "۴",
  "۵",
  "۶",
  "۷",
  "۸",
  "۹",
];
export function replacePersianNumbers(inputString: string) {
  for (let i = 0; i < persianNumber.length; i++) {
    inputString = inputString.replace(
      new RegExp(persianNumber[i], "g"),
      englishNumber[i]
    );
  }
  return inputString;
}
export function replaceEnglishNumbers(inputString: string) {
  for (let i = 0; i < englishNumber.length; i++) {
    inputString = inputString.replace(
      new RegExp(englishNumber[i], "g"),
      persianNumber[i]
    );
  }
  return inputString;
}

export function DateConvertor(date: Date) {
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

export function convertPersianToIso(dateString: string) {
  const parts = dateString.split(" ");

  const persianDate = parts[1];
  const time = parts[0];

  const isoString = `${persianDate} ${time}`;

  return isoString;
}
