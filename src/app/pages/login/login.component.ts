import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	hidePassword: boolean = true;
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required])
	});

  	constructor(private userService: UserService) { }

	ngOnInit(): void {

	}

	onSubmit() {
		this.userService.login({
			email: this.loginForm.value['email'],
			password: this.loginForm.value['password']
		})
		console.log('submitted!');
	}

}
