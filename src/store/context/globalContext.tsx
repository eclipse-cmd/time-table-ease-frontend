'use client';
import { Dispatch, createContext, useReducer } from 'react';
import { ActionCreator, actionCreator } from './actionCreator';
import { ISetNotification } from '@/core';

type GlobalInitialState = {
  notification: ISetNotification;
  isProcessing: boolean;
};

type MyContextType = {
  state: GlobalInitialState;
  dispatch: React.Dispatch<any>;
};

const initialState = {
  notification: { type: 'info', message: '' },
  isProcessing: false,
} satisfies GlobalInitialState;

export const GlobalContext = createContext<MyContextType>({
  state: initialState,
  dispatch: () => null,
});

export const showNotification = (dispatch: Dispatch<any>, message: string, type = 'info', timeout = 7500) => {
  dispatch({
    type: actionCreator.SET_NOTIFICATION,
    payload: {
      message,
      type,
    },
  });

  setTimeout(() => {
    dispatch({
      type: actionCreator.REMOVE_NOTIFICATION,
      payload: {
        message: '',
      },
    });
  }, timeout);
};

export const globalReducer = (
  state: GlobalInitialState,
  { type, payload }: { type: ActionCreator; payload?: any }
): GlobalInitialState => {
  switch (type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: {
          type: payload.type,
          message: payload.message,
        },
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notification: {
          type: payload.type,
          message: '',
        },
      };
    case 'IS_PROCESSING':
      return {
        ...state,
        isProcessing: true,
      };
    case 'STOP_PROCESSING':
      return {
        ...state,
        isProcessing: false,
      };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};
