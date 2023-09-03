import { _TOKEN_NAME_ } from '@/constants';
import { getLocalStorage } from '../utils';

export class AuthSDK {
  private _baseurl: string;
  private _project_id: string;
  private _secret: string;
  private _encoder: string;

  constructor() {
    this._project_id = process.env.NEXT_PUBLIC_PROJECT_ID ?? '';
    this._baseurl = process.env.NEXT_PUBLIC_BASE_API_URL ?? '';
    this._secret = process.env.NEXT_PUBLIC_APP_SECRET ?? 'secret';

    const raw = this._project_id + ':' + this._secret;
    this._encoder = btoa(raw);
  }

  private baseUrl() {
    return this._baseurl;
  }

  private getHeader() {
    return {
      Authorization: 'Bearer ' + localStorage.getItem(_TOKEN_NAME_),
      'x-app-id': this._encoder,
    };
  }

  async login<T>(payload: object): Promise<T> {
    try {
      const response = await fetch(`${this._baseurl}/school/admin/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const e = await response.json();
        const error = new Error(e.message ?? 'Failed to login') as any;
        error.cause = { response: e };

        throw error;
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async checkAuth<T>(): Promise<T> {
    this.baseUrl();
    this.getHeader();

    try {
      const response = await fetch(`${this._baseurl}/school/admin/auth`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      });

      if (!response.ok) {
        const e = await response.json();
        const error = new Error(e.message ?? 'You are not authenticated') as any;
        error.cause = { response: e };

        throw error;
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
