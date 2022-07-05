import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	constructor(private postService: PostService, private userService: UserService) { }

	@Input() post: Post;

	doILike = false;
	user$ = this.userService.user$;

  	ngOnInit(): void {
		if (this.post.likes?.amount) {
			this.user$.subscribe(user => {
				const doILike = this.post.likes.items.findIndex(x => x.email == user.email);
				if (doILike > -1)
					this.doILike = true;
			})
		}
  	}

	postLike() {
		this.doILike = !this.doILike;
		this.postService.postLike({ postid: this.post.id, value: this.doILike });
	}

}
