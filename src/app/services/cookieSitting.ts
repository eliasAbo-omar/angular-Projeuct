export function setCookie(name: string, value: string, daysToLive: number, path: string = '/') {
  const date = new Date();
  date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
  const expire = 'expires=' + date.toUTCString();

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${expire}; path=${path}; Secure; HttpOnly; SameSite=Lax`;
}

export function deleteCookie(name: string) {
  setCookie(name, '', -1);
}

export function getCookie(name: string) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split(';');
  let result = null;

  cArray.forEach((element) => {
    if (element.indexOf(name)) {
      result = element.substring(name.length + 1);
    }
  });

  return result;
}
