import { getUserData } from "../../../utility/Utils"
import axios from "axios"

const user = getUserData()
export const urlBase = 'https://jellyfish-app-wxyzd.ondigitalocean.app/'

export const register = async (...args) => {
   return axios.post(`${urlBase}RegisterCandidatApp`, ...args)
  }
export const addRepresentant = async (...args) => {
    return axios.post(`${urlBase}UserRegister`, ...args)
   }

export const verifyPayment = async (...args) => {
    return axios.post(`${urlBase}api/status-payment`, ...args)
   }

export const login = async (...args) => {
    return axios.post(`${urlBase}loginCandidatApp`, ...args)
   }

export const loginAdmin = async (...args) => {
    return axios.post(`${urlBase}admins/login`, ...args)
   }

export const client = (user) ? axios.create({
    baseURL: `${urlBase}`,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${user.accessToken}`
    }
  }) : axios.create({
    baseURL: `${urlBase}`,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })