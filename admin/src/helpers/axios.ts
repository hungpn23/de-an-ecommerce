import axios, { ResponseType } from 'axios';

import { serverUrl } from '../App';

export default function sendRequest(
  endpoint: string,
  method: string,
  body: Object,
  responseType: ResponseType = 'json'
) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const instance = axios.create({ headers });

  return instance.request({
    method,
    url: serverUrl + endpoint,
    data: body,
    responseType,
  });
}
