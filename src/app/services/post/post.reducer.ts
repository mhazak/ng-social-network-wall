import { Post } from "src/app/pages/posts/post.model";
import { PostActions } from "./post.actions";
import * as postActions from './post.actions';

export interface State {
	posts: Post [];
}

const initialState: State = { posts: null };

export function postReducer (state = initialState, action: PostActions) {
	switch (action.type) {
		case postActions.SET_POSTS:
			return {
				... state,
				posts: action.payload
			}
		default:
			return state;
	}
}

export const getPosts = (state: State) => state.posts;
