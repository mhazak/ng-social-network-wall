import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { Post } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  	constructor(private postService: PostService, private store: Store<fromRoot.State>) { }

	posts$: Observable<Post[]>;

  	ngOnInit(): void {
		this.posts$ = this.store.select(fromRoot.getPosts);
		this.postService.getPosts();
  	}

}
