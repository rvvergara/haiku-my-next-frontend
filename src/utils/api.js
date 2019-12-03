import axios from 'axios';

export const sendRequest = async (method, path, data) => {
  const baseUrl = process.env.API_URL;
  const result = await axios[method](`${baseUrl}/${path}`, data);
  return result;
};

export const sendAuthorizedRequest = async (method, path, token, data = null) => {
  const baseUrl = process.env.API_URL || 'http://localhost:8000';
  axios.defaults.headers.common.Authorization = token;

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
