import { getUserData } from "../../../utility/Utils"
import axios from "axios"

const user = getUserData()
const urlBase = 'https://jellyfish-app-wxyzd.ondigitalocean.app/'

export const register = async (...args) => {
   return axios.post(`${urlBase}RegisterCandidat`, ...args)
  }

export const login = async (...args) => {
    return axios.post(`${urlBase}loginCandidat`, ...args)
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