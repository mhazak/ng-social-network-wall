import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { Post } from 'src/app/pages/posts/post.model';
import * as fromRoot from '../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class PostService {

	constructor(private storage: AngularFireStorage, private firestore: Firestore, private store: Store<fromRoot.State>) { }

	fileUpload (file: File) : Promise<string> {
		return new Promise((resolve, reject) => {

			const path = file.name;
			const ref = this.storage.ref(`${path}`);

			// uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
			// 	const imageUrl = downloadURL;
			// 	console.log('URL:' + imageUrl);
			//   });
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

	async post (post: { text: string, file: File }) {
		console.log({post});
		const _file = await this.fileUpload(post.file);

		this.store.select(fromRoot.getUser).subscribe(_user => {

			const postmodel: Post = {
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
}
