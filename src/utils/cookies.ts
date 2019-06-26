import cookies from 'js-cookie';

const MIDTYPE_COOKIE_KEY = '__mt';
const COOKIE_CONFIG = {
  expires: 1,
  domain: process.env.NODE_ENV === 'development' ? undefined : 'midtype.com'
};

interface IMidtypeCookie {
  jwt: null | string;
}

export const getJWT = (): string | null => {
  const cookie: IMidtypeCookie = cookies.getJSON(MIDTYPE_COOKIE_KEY);
  return cookie ? cookie.jwt : null;
};

export const setJWT = (jwt: string) => {
  const cookie: IMidtypeCookie = cookies.getJSON(MIDTYPE_COOKIE_KEY) || {};
  cookie.jwt = jwt;
  cookies.set(MIDTYPE_COOKIE_KEY, cookie, COOKIE_CONFIG);
};

export const clearJWT = () => {
  const cookie: IMidtypeCookie = cookies.getJSON(MIDTYPE_COOKIE_KEY) || {};
  cookie.jwt = null;
  cookies.set(MIDTYPE_COOKIE_KEY, cookie, COOKIE_CONFIG);
};
