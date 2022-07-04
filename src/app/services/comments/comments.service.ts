import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../user/user.model';
import * as fromRoot from '../../app.reducer';
import * as postActions from '../post/post.actions';

import { doc, collection, Firestore } from '@angular/fire/firestore';
import { setDoc } from '@angular/fire/firestore';
import { PostService } from '../post/post.service';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  constructor(private store: Store<fromRoot.State>, private firestore: Firestore, private postService: PostService) { }

	async postComment(model: {id: string, comment: string}) {
		this.store.select(fromRoot.getUser).subscribe((user: User) => {
			const _collection = doc(collection(this.firestore, 'comments'));
			return setDoc(_collection, {
				postid: model.id,
				email: user.email,
				comment: model.comment,
				dtcreated: new Date().toString()
			});
		})

		this.postService.getPosts();
	}
}
