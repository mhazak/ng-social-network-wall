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

	login(user: User) {
		this.http.get<User[]>(environment.backend + '/users?email=' + user.email).subscribe(res => {
			console.log({res});
			if (!res.length) {
				console.log('no users founded!');
				return;
			}
			const _user = res[0];
			if (_user.password === user.password) {
				console.log('successs');
			} else {
				console.log('invalid!');
			}
		}, err => {
			console.log({ err });
		})
	}

}
