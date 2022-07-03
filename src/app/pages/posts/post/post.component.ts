import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	@Input() post: Post;

	commentForm = new FormGroup({
		comment: new FormControl('', [Validators.required])
	});

  	constructor(private postService: PostService) { }

  	ngOnInit(): void {
  	}

	onComment() {
		this.postService.postComment({
			id: this.post.id,
			comment: this.commentForm.value['comment']
		})
		console.log({post: this.post, id: this.post.id });
	}

}
