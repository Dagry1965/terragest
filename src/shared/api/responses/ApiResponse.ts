export interface ApiResponse<T> {

  success: boolean;

  message?: string;

  data?: T;

  error?: any;

  timestamp: string;
}

export const ApiSuccess =
<T>(
  data: T,
  message?: string
): ApiResponse<T> => {

  return {

    success: true,

    data,

    message,

    timestamp:
      new Date().toISOString(),
  };
};

export const ApiError =
(
  message: string,
  error?: any
): ApiResponse<any> => {

  return {

    success: false,

    message,

    error,

    timestamp:
      new Date().toISOString(),
  };
};
