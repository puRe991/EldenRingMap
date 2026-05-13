/**
 * Sets a browser cookie.
 * @param cname 名
 * @param cvalue 值
 * @param exdays 死亡日
 */
export const setCookie = (cname: string, cvalue: unknown, exdays: number = 30) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires;
};

/**
 * Reads a browser cookie.
 * @param cname 名
 * @returns 值
 */
export const getCookie = (cname: string): string => {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
};
