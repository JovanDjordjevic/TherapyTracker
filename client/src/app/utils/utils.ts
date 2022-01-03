import { formatDate } from "@angular/common";

export function formattedDate(date: Date) {
  return formatDate(date, 'dd/MM/yyyy', 'en-US');
}
