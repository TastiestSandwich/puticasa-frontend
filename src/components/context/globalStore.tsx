import React, {createContext, useReducer, useEffect, PropsWithChildren } from "react";
import { GlobalContext, GlobalState, Action } from './storeTypes';
import { assertNever } from '../../utils/utils';


const initialStoreContext: GlobalContext = {
    state: {
        user: null,
        house: null,
        resident: null,
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
        case 'SET_HOUSE_RESIDENT':
            return {
                ...state,
                house: action.payload.house,
                resident: action.payload.resident
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            };
        case 'SYNC_REQUEST':
            return {
                ...action.payload
            }
        case 'LOGOUT':
            return {
                ...initialStoreContext.state
            }
        case 'EXIT_HOUSE':
            return {
                ...state,
                house: null,
                resident: null
            }
        default:
            return assertNever(action);
    }
};

const globalStoreContext = createContext(initialStoreContext)
const { Provider } = globalStoreContext

const GlobalStateProvider = ({ children }: PropsWithChildren<any>) => {

    const STORAGE_KEY = 'PUTIDATA'

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

    // use the newest data on every LocalStorage change
    useEffect(() => {
        window.addEventListener('storage', () => {
            const persistedData = localStorage.getItem(STORAGE_KEY)
            const newState = persistedData ? (JSON.parse(persistedData) as GlobalState) : null

            if (newState) {
                dispatch({ type: 'SYNC_REQUEST', payload: newState })
            }
        })
    }, [])

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { globalStoreContext, GlobalStateProvider }
