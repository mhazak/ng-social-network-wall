import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	@Input() post: Post;

	doILike = false;

  	constructor(private postService: PostService) { }

  	ngOnInit(): void {
  	}

}
