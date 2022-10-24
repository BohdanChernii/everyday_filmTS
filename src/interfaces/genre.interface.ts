export type IGenre = {
  id: number,
  name: string
}

export type IGenres<IGenre> = {
  genres: {
    genres?: IGenre[]
  }
}