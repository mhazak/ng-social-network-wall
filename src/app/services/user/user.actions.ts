import { Action } from "@ngrx/store";
import { User } from "./user.model";

export const SET_AUTH = '[USER] Authenticated';
export const SET_NONAUTH = '[USER] Non Authenticated';

export class SetAuthenticated implements Action {
	constructor (public payload: User) {}
	readonly type = SET_AUTH
}

export class SetUnauthenticated implements Action {
	readonly type = SET_NONAUTH
}

export type UserActions = SetAuthenticated | SetUnauthenticated;
