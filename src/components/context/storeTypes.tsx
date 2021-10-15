import React, { Dispatch } from 'react'


export type GlobalContext = { state: GlobalState; dispatch: Dispatch<Action> }

export interface GlobalState {
  user: User | null
  house: House | null
  resident: Resident | null
  token: string | null
}

export interface User {
  email: string,
  first_name: string,
  last_name: string,
  pk: number,
  username: string
}

export interface Resident {
  id: number,
  user: number,
  house: number,
  type: number,
  status: number,
  last_modified_date: string,
  start_date: string,
  end_date: string | null
}

export interface House {
  name: string,
  description: string,
  status: number,
  start_date: string,
  last_modified_date: string,
  end_date: string | null
}

export interface HouseResidentPayload {
  house: House | null,
  resident: Resident | null
}

export type Action = | SetUserAction | SetHouseResidentAction | SetTokenAction | StorageSyncAction | LogoutAction | ExitHouseAction

export interface SetUserAction {
  type: 'SET_USER',
  payload: User | null
}

export interface SetHouseResidentAction {
  type: 'SET_HOUSE_RESIDENT',
  payload: HouseResidentPayload
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

export interface ExitHouseAction {
  type: 'EXIT_HOUSE'
}