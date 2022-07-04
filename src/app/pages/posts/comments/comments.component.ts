import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private postService: PostService) { }

	@Input() post;
	commentForm = new FormGroup({
		comment: new FormControl('', [Validators.required])
	});

	onComment() {
		this.postService.postComment({
			id: this.post.id,
			comment: this.commentForm.value['comment']
		})
		console.log({post: this.post, id: this.post.id });
	}

  ngOnInit(): void {
  }

}
