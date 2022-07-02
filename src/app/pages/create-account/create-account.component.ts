import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {

	hidePassword: boolean = true;
	signupForm = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)])
	})
  	constructor(private userService: UserService) { }

	ngOnInit(): void {
	}

	onSubmit() {
		this.userService.createUser({
			email: this.signupForm.value['email'],
			password: this.signupForm.value['password']
		});
	}

}
