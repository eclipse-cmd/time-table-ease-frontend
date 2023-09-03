export type NotificationType = 'error' | 'loading' | 'info' | 'warning' | 'success';

export interface ISetNotification {
  type: NotificationType;
  message?: string;
}

export interface LoginResponse {
  data: {
    admin: ISetAdmin;
    token: string;
  };
  message: string;
  success: boolean;
}

export interface ISetAdmin {
  id: string;
  createdAt: string;
  deletedAt?: string;
  email: string;
  fullname: string;
  updatedAt: string;
  school: {
    createdAt: string;
    domainName: string;
    id: string;
    name: string;
    theme: string;
    updatedAt: string;
  };
}
