import { Action } from "@ngrx/store";
import { Post } from "src/app/pages/posts/post.model";
export const SET_POSTS = '[Post] Set posts';

export class SetPosts implements Action {
	readonly type = SET_POSTS;
	constructor(public payload: Post[]) {}
}

export type PostActions = SetPosts;
