import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { finalize, map, Observable } from 'rxjs';
import { Post } from 'src/app/pages/posts/post.model';
import * as fromRoot from '../../app.reducer';
import * as PostActions from './post.actions';

@Injectable({
  providedIn: 'root'
})
export class PostService {

	constructor(private storage: AngularFireStorage, private firestore: Firestore, private store: Store<fromRoot.State>) { }

	posts$: Observable<any[]>;

	fileUpload (file: File) : Promise<string> {
		return new Promise((resolve, reject) => {

			const path = file.name;
			const ref = this.storage.ref(`${path}`);
			this.storage.upload(path, file)
				.snapshotChanges()
					.pipe(
						finalize(() => {
							console.log('finalize');
							const url = ref.getDownloadURL();
							url.subscribe((imgurl: string) => {
								resolve(imgurl);
								console.log({imgurl});
							})
						})
					).subscribe((final: any) => {
						console.log({final});
					})
		})
	}

	async post (post: { title: string, text: string, file: File }) {
		console.log({post});
		const _file = await this.fileUpload(post.file);

		this.store.select(fromRoot.getUser).subscribe(_user => {

			const postmodel: Post = {
				title: post.title,
				email: _user.email,
				text: post.text,
				imageURL: _file,
				dtcreated: new Date()
			}
			console.log({postmodel});
			const postsCollection = collection(this.firestore, 'posts');
			return addDoc(postsCollection, postmodel);
		})
	}

	getPosts () {

		const _collection = collection(this.firestore, 'posts');

		collectionData(_collection, { idField: 'id'}).subscribe((res: Post[]) => {
			console.log('dispatch', {res});
			this.store.dispatch(new PostActions.SetPosts(res));
			// console.log({res})
		})
	}
}
