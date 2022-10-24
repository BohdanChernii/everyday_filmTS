import {useLocation, Location} from "react-router";

interface IState<T> extends Location {
  state: T
}

type LocationType<S> = ReturnType<typeof useLocation> & IState<S>

export const useAppLocation = <State>(): IState<State> => useLocation() as LocationType<State>

