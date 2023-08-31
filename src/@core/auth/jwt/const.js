/*eslint-disable*/

import { getUserData, token } from "../../../utility/Utils";
import axios from "axios";

const user = getUserData();
export const urlBase = "https://jellyfish-app-wxyzd.ondigitalocean.app/";

export const register = async (...args) => {
  return axios.post(`${urlBase}RegisterCandidatApp`, ...args);
};

export const registerParti = async (...args) => {
  return axios.post(`${urlBase}admins_register`, ...args);
};
export const addRepresentant = async (...args) => {
  return axios.post(`${urlBase}UserRegister`, ...args);
};

export const verifyPayment = async (...args) => {
  return axios.post(`${urlBase}api/status-payment`, ...args);
};
export const loginParti = async (...args) => {
  return axios.post(`${urlBase}admins_login`, ...args);
};

export const ActivateCandidat = async (...args) => {
  return axios.post(`${urlBase}ActivateCandidat`, ...args, {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${getUserData().accessToken}`,
    },
  });
};

export const DesactivateCandidat = async (...args) => {
  return axios.post(`${urlBase}DesactivateCandidat`, ...args, {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${getUserData().accessToken}`,
    },
  });
};

export const login = async (...args) => {
  return axios.post(`${urlBase}loginCandidatApp`, ...args);
};

export const loginAdmin = async (...args) => {
  return axios.post(`${urlBase}admins/login`, ...args);
};

export const client = axios.create({
  baseURL: `${urlBase}`,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `${user ? "Bearer " + user.accessToken : ""}`,
  },
});

export const paginate = (items, page, perPage = 12) => {
  
  const offset = perPage * (page - 1);
  const totalPages = Math.ceil(items.length / perPage);
  const paginatedItems = items.slice(offset, perPage * page);
  return {
    previousPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    total: items.length,
    totalPages: totalPages,
    items: paginatedItems,
  };
};