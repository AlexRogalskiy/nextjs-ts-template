import { HttpClient, HttpCodes } from './types';
import {
  AuthError,
  InternalError,
  NotFoundError,
  ServerError,
} from '@/modules/error';

const AUTH_ERROR_CODES = [
  HttpCodes.Unauthorized,
  HttpCodes.Forbidden,
  HttpCodes.ProxyAuthenticationRequired,
] as const;

const getErrorByResponseStatus = (responseStatus: number) => {
  if (responseStatus === HttpCodes.NotFound) {
    return NotFoundError;
  }
  if (AUTH_ERROR_CODES.includes(responseStatus)) {
    return AuthError;
  }
  if (responseStatus > 400 && responseStatus < 500) {
    return InternalError;
  }
  return ServerError;
};

const request = async <ResponseType>(
  ...args: Parameters<typeof fetch>
): Promise<ResponseType> => {
  const response = await fetch(...args);
  if (!response.ok) {
    const errorMessage =
      response.statusText ||
      `Error requesting with params: ${JSON.stringify(args)}`;
    const errorFn = getErrorByResponseStatus(response.status);
    throw new errorFn(errorMessage);
  }
  return response.json();
};

const httpClient: HttpClient = {
  async get(url: string) {
    return request(url);
  },
  async post(url, body = {}) {
    const parsedBody = JSON.stringify(body);
    return request(url, {
      method: 'POST',
      body: parsedBody,
    });
  },
  async put(url, body = {}) {
    const parsedBody = JSON.stringify(body);
    return request(url, {
      method: 'PUT',
      body: parsedBody,
    });
  },
  async delete(url: string) {
    return request(url, {
      method: 'DELETE',
    });
  },
};

export default httpClient;
