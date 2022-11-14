import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const corsHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, GET, POST, PATCH, PUT, OPTIONS",
  "X-Content-Type-Options": "nosniff",
};

const securityHeaders = {
  "Content-Security-Policy": "default-src https frame-ancestors 'none'",
  "Referrer-Policy": "same-origin",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "X-Is-Webapp": true,
};

function interceptorsRequestError(error: any) {
  const erro = error;
  erro.response.body = error.response.error;
  delete erro.response.error;
  return erro.response;
}

async function interceptorsRequestConfig(config: AxiosRequestConfig) {
  console.log(config);
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
      body: {
        success: false,
        data: error.response.data.data,
      },
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

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: false,
  headers: {
    ...corsHeaders,
    ...securityHeaders,
  },
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
