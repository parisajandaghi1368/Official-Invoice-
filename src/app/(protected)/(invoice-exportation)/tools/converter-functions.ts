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
