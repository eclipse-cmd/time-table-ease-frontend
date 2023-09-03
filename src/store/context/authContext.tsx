'use client';
import { ISetAdmin, clearLocalStorage, setLocalStorage } from '@/core';
import { createContext, useReducer } from 'react';
import { ActionCreator } from './actionCreator';

type AuthInitialState = {
  isAuth: boolean;
  admin: ISetAdmin | null;
};

type MyContextType = {
  state: AuthInitialState;
  dispatch: React.Dispatch<any>;
};

const initialState = {
  isAuth: false,
  admin: null,
} satisfies AuthInitialState;

export const AuthContext = createContext<MyContextType>({
  state: initialState,
  dispatch: () => null,
});

export const reducer = (
  state: AuthInitialState,
  action: { type: ActionCreator; payload?: any }
): AuthInitialState => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuth: true,
        admin: action.payload,
      };
    case 'LOGIN':
      setLocalStorage(action.payload.token);
      return {
        ...state,
        isAuth: true,
        admin: action.payload.admin,
      };
    case 'LOGOUT':
      clearLocalStorage();
      return state;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
