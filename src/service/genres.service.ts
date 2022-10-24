import {AxiosRes, axiosService} from "./axios.service";
import {urls} from "../configs";
import {IGenre} from "../interfaces";

export const genresService = {
  get: (): AxiosRes<IGenre[]> => axiosService(urls.posts)
}