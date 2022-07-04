import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore, collectionData, collection, doc, getDocs, query, where } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { finalize, Observable } from 'rxjs';
import { Post } from 'src/app/pages/posts/post.model';
import * as fromRoot from '../../app.reducer';
import { User } from '../user/user.model';
import * as PostActions from './post.actions';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { setDoc } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostService {

	constructor(private db: AngularFirestore, private storage: AngularFireStorage, private firestore: Firestore, private store: Store<fromRoot.State>) { }

	posts$: Observable<any[]>;
	postCollection: AngularFirestoreCollection<Post[]>;

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
			const _tmp = doc(collection(this.firestore, 'posts'))
			return setDoc(_tmp, postmodel);
		})
	}

	async getPosts () {

		const _collection = collection(this.firestore, 'posts');
		collectionData(_collection, { idField: 'id' })
			.subscribe(async (res: any) => {
				const comment = collection(this.firestore, 'comments');
				// find comments for post
				for (const _post of res) {

					const q = query(comment, where("postid", "==", _post.id));
					const querySnapshot = await getDocs(q);
					let comments = [];
					querySnapshot.forEach((doc) => {
						console.log({data: doc.data()});
						comments.push(doc.data());
					});
					_post.comments = comments;
				}
				this.store.dispatch(new PostActions.SetPosts(res));
			})
	}

	async postComment(model: {id: string, comment: string}) {
		this.store.select(fromRoot.getUser).subscribe((user: User) => {
			this.db.collection('comments').doc().set({
				postid: model.id,
				email: user.email,
				comment: model.comment,
				dtcreated: new Date().toString()

			})
		})
	}
}
