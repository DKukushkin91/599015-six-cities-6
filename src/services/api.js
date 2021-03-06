import axios from 'axios';
import {ErrorMessageType} from '../constants';

const HttpCode = {
  UNAUTHORIZED: 401
};

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (!response) {
      throw new Error(ErrorMessageType.NETWORK_ERROR);
    }

    if (response.status === HttpCode.BAD_REQUEST) {
      throw new Error(ErrorMessageType.BAD_REQUEST);

    } else if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
