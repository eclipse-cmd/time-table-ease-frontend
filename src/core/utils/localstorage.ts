import { _TOKEN_NAME_ } from '@/constants';
const isClient = typeof window != 'undefined';

export const setLocalStorage = (value: any, key = _TOKEN_NAME_, encrypt = true): void => {
  if (isClient) {
    if (encrypt) {
      localStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
    } else {
      localStorage.setItem(key, value);
    }
  }
};
export const getLocalStorage = (key = _TOKEN_NAME_, decode = true) => {
  if (isClient) {
    const value = localStorage.getItem(key);

    if (!value) return null;

    return decode ? JSON.parse(decodeURIComponent(value)) : JSON.parse(value) || null;
  }
};

export const clearLocalStorage = (key = _TOKEN_NAME_): void => {
  if (isClient) {
    localStorage.removeItem(key);
  }
};

export const destroyLocalStorage = (): void => {
  if (isClient) {
    localStorage.clear();
  }
};
