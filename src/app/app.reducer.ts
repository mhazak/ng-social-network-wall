import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './services/user/user.reducer';
import * as fromPost from './services/post/post.reducer';
import * as fromComment from './services/comments/comments.reducer';

export interface State {
	user: fromUser.State;
	post: fromPost.State;
	comment: fromComment.State;
}

export const reducers: ActionReducerMap<State> = {
	user: fromUser.userReducer,
	post: fromPost.postReducer,
	comment: fromComment.commentsReducer
}

export const getUserState = createFeatureSelector<fromUser.State>('user');
export const getIsAuth = createSelector(getUserState, fromUser.getIsAuth);
export const getUser = createSelector(getUserState, fromUser.getUser);

export const getPostState = createFeatureSelector<fromPost.State>('post');
export const getPosts = createSelector(getPostState, fromPost.getPosts);

export const getCommentState = createFeatureSelector<fromComment.State>('comment');
export const getComments = createSelector(getCommentState, fromComment.getComments);
