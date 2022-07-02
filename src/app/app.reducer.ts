import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './services/user/user.reducer'

export interface State {
	user: fromUser.State
}

export const reducers: ActionReducerMap<State> = {
	user: fromUser.userReducer
}

export const getUserState = createFeatureSelector<fromUser.State>('user');
export const getIsAuth = createSelector(getUserState, fromUser.getIsAuth);
export const getUser = createSelector(getUserState, fromUser.getUser);
