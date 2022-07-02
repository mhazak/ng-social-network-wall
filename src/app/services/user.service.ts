import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) { }

	createUser(user: User) {
		this.http.post(environment.backend + '/users', user).subscribe(res => {
			console.log({res});
		}, err => {
			console.log({err});
		})
	}

}
