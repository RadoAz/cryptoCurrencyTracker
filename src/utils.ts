import {PriceItem, Price} from './types';

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const preparePricesDropdownData = (obj: Price): PriceItem[] => {
  return Object.entries(obj).map(([currency, value]) => ({
    currency,
    value,
  }));
};
