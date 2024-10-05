import { X_API_KEY } from "../config/config";
export const getCommonHeaders = (
  options:
    | { sendToken: false; token?: null }
    | { sendToken?: true; token: string }
): Record<string, string> => {
  const sendToken = options.sendToken === false ? false : true;
  return sendToken && options.token
    ? {
        token: options.token,
        "x-api-key": X_API_KEY,
      }
    : {
        "x-api-key": X_API_KEY,
      };
};
