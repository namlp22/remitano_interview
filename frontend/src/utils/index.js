const localStorageKey = Object.freeze({
  TOKEN: "token",
  USER_EMAIL: "userEmail",
});

const isUserLoggedIn = () => {
  const userEmail = localStorage.getItem(localStorageKey.USER_EMAIL);
  return userEmail !== null && userEmail !== undefined;
};
const getUserEmail = () => {
  const userEmail = localStorage.getItem(localStorageKey.USER_EMAIL);
  return userEmail !== null ? userEmail : "";
};
const setUserEmail = (email) => {
  localStorage.setItem(localStorageKey.USER_EMAIL, email);
};

const getToken = () => {
  const token = localStorage.getItem(localStorageKey.TOKEN);
  return token;
};
const setToken = (token) => {
  localStorage.setItem(localStorageKey.TOKEN, token);
};
const logOut = () => {
  localStorage.removeItem(localStorageKey.USER_EMAIL);
  localStorage.removeItem(localStorageKey.TOKEN);
};

const getYouTubeVideoKey = (url) => {
  const videoIdMatch = url.match(/watch\?v=([^&]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null
  return videoId
};

export {
  isUserLoggedIn,
  logOut,
  getUserEmail,
  setUserEmail,
  getYouTubeVideoKey,
  getToken,
  setToken,
  localStorageKey
};
