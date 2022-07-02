import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  	constructor() { }

	ngOnInit(): void {
	}

	onSubmit() {

	}

}
