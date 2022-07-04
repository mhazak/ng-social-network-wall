import { Action } from "@ngrx/store";
import { CommentModel } from "src/app/pages/posts/comments/comments.model";

export const AVAILABLE_COMMENTS = '[Comments] show comments';
export const COMMENT_ADDED = '[Comments] added new comment';

export class AvailableComments implements Action {
	readonly type = AVAILABLE_COMMENTS;

	constructor(public payload: CommentModel[]) {}
}

export class CommentAdded implements Action {
	readonly type = COMMENT_ADDED;

	constructor(public payload: CommentModel) {}
}

export type CommentActions = AvailableComments | CommentAdded;
