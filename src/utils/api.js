import axios from 'axios';

const baseUrl = process.env.API_URL || 'http://localhost:8000';


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
    console.log('Im setting token in api.js');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log('Auth Header',axios.defaults.headers.common.Authorization);
  } else {
    console.log('Im setting token in api.js else');
    delete axios.defaults.headers.common.Authorization;
  }
};
