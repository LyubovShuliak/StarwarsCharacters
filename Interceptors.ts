import axios, { AxiosError } from 'axios/index';

axios.interceptors.response.use(null, function (error: AxiosError) {
  let message: string;

  switch (error.code) {
    case 'ERR_NETWORK':
      message =
        'Please, turn on internet connection and reopen app. If internet connection exists try later.';
      break;
    default:
      message = 'Something went wrong. Please, reopen app';
      break;
  }
  return Promise.reject(new Error(message));
});
