import axios, {AxiosResponse} from "axios";

import {baseURL} from "../configs";


export type AxiosRes<T> = Promise<AxiosResponse>

export const axiosService = axios.create({baseURL})

const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWU1ZDM4YjIzZGNjMTRhNDliNDE1NTdkNzAzNDZmMCIsInN1YiI6IjYzNGFmMzViZjE3NTljMDA3YWYwYTMwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FSTUomwhWZgQAiH9VWZBAoMgwAF1DoTJMBBx5FAh_m0'

axiosService.interceptors.request.use((config) => {
  config.headers = {
    Authorization: token
  }
  return config
})