import {baseURL, urls} from "../configs";
import {AxiosRes, axiosService} from "./axios.service";
import {IGenre, IMovie} from "../interfaces";


export const moviesService = {
  changePage: (page: number | string | null): AxiosRes<IMovie[]> => axiosService(`${baseURL}/${urls.page}${page}`),

  getByGenres: (page: number | string | null, genre: number): AxiosRes<IMovie[]> => axiosService(`${baseURL}/${urls.page}${page}&with_genres=${genre}`),

  getBySearchParams: (page: number | string | null, search: string) => axiosService(`${baseURL}${urls.search}/?page=${page}&query=${search}`),
}