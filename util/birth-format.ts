export function formatBirthDate(birth: number) {
  if (!birth || isNaN(birth)) {
    return "-";
  }
  // 861212 -> 86.12.12
  const str = birth.toString().padStart(6, "0");
  return `${str.slice(0, 2)}.${str.slice(2, 4)}.${str.slice(4, 6)}`;
}
