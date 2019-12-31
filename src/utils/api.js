import axios from 'axios';

const baseUrl = 'https://api.igaku.co';

export const sendRequest = async (method, path, data) => {
  const result = await axios[method](`${baseUrl}/${path}`, data);
  return result;
};

export const sendAuthorizedRequest = async (method, path, token, data = null) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const result = await axios[method](`${baseUrl}/${path}`, data);
  return result;
};

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
