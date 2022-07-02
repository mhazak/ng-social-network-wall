import { UserActions } from "./user.actions";
import { User } from "./user.model";
import * as userActions from "./user.actions";

export interface State {
	isAuthenticated: boolean;
	user: User
}

const initialState: State = { isAuthenticated: false, user: null };

export function userReducer (state: State = initialState, action: UserActions) {
	switch (action.type) {
		case (userActions.SET_AUTH):
			return {
				isAuthenticated: true,
				user: action.payload
			};
		case (userActions.SET_NONAUTH):
			return {
				isAuthenticated: false,
				user: null
			};
		default:
			return state;
	}
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getUser = (state: State) => state.user;
