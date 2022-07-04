import { CommentModel } from "src/app/pages/posts/comments/comments.model";
import { CommentActions } from "./comments.actions";
import * as commentActions from './comments.actions';

export interface State {
	comments: CommentModel[];
}

const initialState: State = { comments: null };

export function commentsReducer(state = initialState, action: CommentActions) {
	switch (action.type) {
		case commentActions.AVAILABLE_COMMENTS:
			return {
				...state,
				comments: action.payload
			}
		default:
			return state;
	}
}

export const getComments = (state: State) => state.comments;
