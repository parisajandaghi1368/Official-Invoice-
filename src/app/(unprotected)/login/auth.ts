import axios from "axios";
import { getCommonHeaders } from "../../../shared/utils/fetch-helpers";
import { urls } from "../../../shared/config/urls";
const paths = {
  login: "/tokens/user",
  token: "/tokens/validate",
  signUp: "/users",
  verifyMobile: "/verification/mobile",
  requestMobileVerification: "/verification/mobile/send",
};

type LoginResData = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  role: string;
};

type LoginReqData = {
  username: string;
  password: string;
  captcha_solution: string;
  captcha_id: string;
};
type LoginResErrorData = {
  code?: number;
  message?: string;
  fields?: { captcha_id: [] };
};
export const login = async ({
  username,
  password,
  captcha_solution,
  captcha_id,
}: LoginReqData) => {
  const data = {
    grant_type: "password",
    client_id: 1,
    client_secret: "MapIr",
    username,
    password,
    captcha_solution,
    captcha_id,
  };

  try {
    const responseData = (
      await axios.post(`${urls.baseRegister}${paths.login}`, data, {
        headers: getCommonHeaders({ sendToken: false }),
      })
    ).data;
    localStorage.setItem("userId", data.username);
    return { data: responseData as LoginResData, error: null };
  } catch (err: any) {
    console.log("err", err);
    return { data: null, error: err?.response?.data as LoginResErrorData };
  }
};
