import axios from "axios";
import type { AxiosRequestConfig } from "axios";

function interceptorsRequestError(error: any) {
  const erro = error;
  erro.response.body = error.response.error;
  delete erro.response.error;
  return erro.response;
}

async function interceptorsRequestConfig(config: AxiosRequestConfig) {
  const token = sessionStorage.getItem("token");

  const conf = config;

  conf.headers.common["token"] = token;
  return conf;
}

function interceptorsResponseConfig(response: any) {
  const resp = response;
  resp.body = resp.data;
  delete resp.data;
  return resp;
}

function interceptorsResponseError(error: any) {
  let erro = {};
  if (error.response) {
    erro = {
      body: error.response.data,
    };
  } else {
    erro = {
      body: {
        success: false,
        data: "Network error",
      },
    };
  }
  return erro;
}
const baseUrl = "https://server-nua2vj8u5-kevenbarros.vercel.app";
const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  interceptorsRequestConfig,
  interceptorsRequestError
);

api.interceptors.response.use(
  interceptorsResponseConfig,
  interceptorsResponseError
);

export default api;
