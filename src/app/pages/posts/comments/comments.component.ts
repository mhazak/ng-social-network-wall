import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private commentsService: CommentsService) { }

	@Input() post;
	commentForm = new FormGroup({
		comment: new FormControl('', [Validators.required])
	});

	onComment() {
		this.commentsService.postComment({
			id: this.post.id,
			comment: this.commentForm.value['comment']
		})
		console.log({post: this.post, id: this.post.id });
	}

  ngOnInit(): void {
  }

}
