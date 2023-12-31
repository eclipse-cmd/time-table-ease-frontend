export type ActionCreator = keyof typeof actionCreator;

export const actionCreator = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  SET_AUTH: 'SET_AUTH',
  DELETE_AUTH: 'DELETE_AUTH',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  IS_PROCESSING: 'IS_PROCESSING',
  STOP_PROCESSING: 'STOP_PROCESSING',
};
