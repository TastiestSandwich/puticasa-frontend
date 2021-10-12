import React, { Dispatch } from 'react'


export type GlobalContext = { state: GlobalState; dispatch: Dispatch<Action> }

export interface GlobalState {
  user: User | null
  activeHouse: House | null
  token: string | null
}

export interface User {
  email: string,
  first_name: string,
  last_name: string,
  pk: number,
  username: string
}

export interface House {
  name: string,
  pk: number
}

export type Action = | SetUserAction | SetActiveHouseAction | SetTokenAction | StorageSyncAction | LogoutAction

export interface SetUserAction {
  type: 'SET_USER',
  payload: User | null
}

export interface SetActiveHouseAction {
  type: 'SET_ACTIVE_HOUSE',
  payload: House | null
}

export interface SetTokenAction {
  type: 'SET_TOKEN',
  payload: string
}

export interface StorageSyncAction {
    type: 'SYNC_REQUEST'
    payload: GlobalState
}

export interface LogoutAction {
  type: 'LOGOUT'
}
