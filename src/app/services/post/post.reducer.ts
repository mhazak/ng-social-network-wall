import { Post } from "src/app/pages/posts/post.model";
import { PostActions } from "./post.actions";
import * as postActions from './post.actions';

export interface State {
	posts: Post [];
	updatedPostId: string;
}

const initialState: State = { posts: null, updatedPostId: null };

export function postReducer (state = initialState, action: PostActions) {
	switch (action.type) {
		case postActions.SET_POSTS:
			return {
				... state,
				posts: action.payload
			};
		case postActions.POST_COMMENT_ADDED:
			const _updatedPost = action.payload.post;
			const _originalpost = state.posts.find(x => x.id == _updatedPost.id);
			_originalpost.comments = _updatedPost.comments;
			console.log({_originalpost, _updatedPost});
			return {
				... state,
				posts: state.posts
			};
		default:
			return state;
	}
}

export const getPosts = (state: State) => state.posts;
