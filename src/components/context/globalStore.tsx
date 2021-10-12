import React, {createContext, useReducer, useEffect, PropsWithChildren } from "react";
import { GlobalContext, GlobalState, Action } from './storeTypes';
import { assertNever } from '../../utils/utils';


const initialStoreContext: GlobalContext = {
    state: {
        user: null,
        activeHouse: null,
        token: null,
    },
    dispatch: (_a) => {},
}

const reducer = (state: GlobalState, action: Action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'SET_ACTIVE_HOUSE':
            return {
                ...state,
                activeHouse: action.payload
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        default:
            return assertNever(action);
    }
};

const globalStoreContext = createContext(initialStoreContext)
const { Provider } = globalStoreContext

const GlobalStateProvider = ({ children }: PropsWithChildren<any>) => {

    const STORAGE_KEY = 'MY_DATA'

    // load data initially
    const [state, dispatch] = useReducer(reducer, initialStoreContext.state, (state) => {
        const persistedData = localStorage.getItem(STORAGE_KEY)
        const newState = persistedData ? JSON.parse(persistedData) : initialStoreContext.state
        return { ...newState }
    })

    // save data on every change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }, [state])

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { globalStoreContext, GlobalStateProvider }
