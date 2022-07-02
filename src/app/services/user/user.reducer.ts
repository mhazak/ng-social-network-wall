import { UserActions } from "./user.actions";
import { User } from "./user.model";
import * as userActions from "./user.actions";

export interface State {
	isAuthenticated: boolean;
	user: User
}

const initialState: State = { isAuthenticated: false, user: null };

// TODO remove password!!!!!
export function userReducer (state: State = initialState, action: UserActions) {
	switch (action.type) {

		case (userActions.CHECK_AUTH):
			const _user = localStorage.getItem('user');
			if (_user) {
				const loggedUser: User = JSON.parse(_user);
				return {
					isAuthenticated: true,
					user: loggedUser
				}
			} else
				return {
					isAuthenticated: false,
					user: null
				}

		case (userActions.SET_AUTH):
			localStorage.setItem('user', JSON.stringify(action.payload));
			return {
				isAuthenticated: true,
				user: action.payload
			};
		case (userActions.SET_NONAUTH):
			localStorage.removeItem('user');
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
