import { defineStore } from "pinia";
import { IUser } from "../type";

type AuthState = {
  user?: IUser | null;
  token?: string | null;
};

type ActionType = {
  login: (token: string, user: Record<string, any>) => void;
  logout: () => void;
};

type GetterType = {
  berear: (state: AuthState) => string;
  isAuth: (state: AuthState) => boolean;
};

export const useAuth = defineStore<string, AuthState, GetterType, ActionType>(
  "auth",
  {
    state: (): AuthState => ({ user: null, token: null }),
    getters: {
      berear: (state) => `${state.token ?? ""}`,
      isAuth: (state) => state.user !== null,
    },
    actions: {
      login(token: string, user: Record<string, any>): void {
        this.user = user as IUser;
        this.token = token;
      },
      logout(): void {
        this.user = null;
        this.token = null;
      },
    },
    persist: {
      storage: sessionStorage,
    },
  }
);
