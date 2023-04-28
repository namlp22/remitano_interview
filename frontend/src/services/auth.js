import { makeRequest } from './index';

export function loginOrRegister(data = {}) {
  const url = "auth/login-register";
  return makeRequest({ url, method: 'POST', data });
}
