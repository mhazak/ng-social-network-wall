import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  	constructor(private postService: PostService) { }

	postForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		text: new FormControl('', [Validators.required]),
		file: new FormControl()
	});

	ngOnInit(): void {
	}

	onPost() {
		const _file = this.postForm.value['file']._files[0];
		this.postService.post({
			title: this.postForm.value['title'],
			file: _file,
			text: this.postForm.value['text']
		})
	}

}
