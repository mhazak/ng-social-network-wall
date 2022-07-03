import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { User } from 'src/app/services/user/user.model';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  	constructor(private postService: PostService, private store: Store<fromRoot.State>) { }

	posts$: Observable<Post[]>;
	postForm = new FormGroup({
		text: new FormControl('', [Validators.required]),
		file: new FormControl()
	});

  	ngOnInit(): void {
		this.posts$ = this.store.select(fromRoot.getPosts);
		this.postService.getPosts();
  	}

  	// onFileSelected (event: any) {
	// 	console.log({file: event.target.files, event});
	// 	const file = event.target.files[0];
	// 	this.postService.fileUpload(file);
  	// }

	onPost() {
		const _file = this.postForm.value['file']._files[0];
		this.postService.post({
			file: _file,
			text: this.postForm.value['text']
		})
	}
}
