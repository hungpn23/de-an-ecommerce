import axios, { ResponseType } from 'axios';

import { serverUrl } from '../App';

export default function sendRequest(
  method: string,
  endpoint: string,
  body?: any,
  contentType: string = 'application/json',
  responseType: ResponseType = 'json'
) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
  };

  const instance = axios.create({ headers });

  instance.interceptors.request.use(
    config => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) config.headers.Authorization = `Bearer ${access_token}`;
      return config;
    },
    err => Promise.reject(err)
  );

  return instance.request({
    method,
    url: serverUrl + endpoint,
    data: body,
    responseType,
  });
}
