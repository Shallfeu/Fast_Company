const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USER_KEY = "local-id";

export const setTokens = ({
  refreshToken,
  idToken,
  localId,
  expiresIn,
}: {
  refreshToken: string;
  idToken: string;
  localId: string;
  expiresIn: number;
}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(USER_KEY, localId);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, String(expiresDate));
};

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const getExpiresToken = () => Number(localStorage.getItem(EXPIRES_KEY));

export const getUserId = () => localStorage.getItem(USER_KEY);

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresToken,
  getUserId,
};

export default localStorageService;
