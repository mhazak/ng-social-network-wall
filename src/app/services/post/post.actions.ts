import { Action } from "@ngrx/store";
import { Post } from "src/app/pages/posts/post.model";

export const SET_POSTS = '[Post] Set posts';
export const POST_COMMENT_ADDED = '[Post] Comment was added to the post!';
export const UPDATE_POST_AFTER_COMMENT = '[Post] Update only one post after comment.';

export class SetPosts implements Action {
	readonly type = SET_POSTS;
	constructor(public payload: Post[]) {}
}

export class CommentAdded implements Action {
	readonly type = POST_COMMENT_ADDED;
	constructor(public payload: { post: any }) {}
}

export class UpdatePostAfterComment implements Action {
	readonly type = UPDATE_POST_AFTER_COMMENT;
	constructor(public payload: { postid: string }) {}
}

export type PostActions = SetPosts | CommentAdded | UpdatePostAfterComment;
