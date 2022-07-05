import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UiService } from '../ui/ui.service';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer';
import * as UserActions from './user.actions';

import { User } from './user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient, private uiService: UiService, private store: Store<{ user: fromRoot.State }>, private router: Router) { }

	user$: Observable<User>;

	initAuthListener () {
		this.store.dispatch(new UserActions.CheckAuthenticated());
		this.store.select(fromRoot.getIsAuth).subscribe(isAuth => {
			this.user$ = this.store.select(fromRoot.getUser);
			if (isAuth) {
				this.router.navigate(['/posts']);
				// this.store.dispatch(new UserActions.SetAuthenticated());
			} else {
				this.router.navigate(['/login']);
				this.store.dispatch(new UserActions.SetUnauthenticated());
			}
		})
	}

	// TODO hash password!!!
	createUser(user: User) {
		this.http.post<{ email: string, password: string, id: number }>(environment.backend + '/users', user).subscribe(res => {
			console.log({res});
			this.store.dispatch(new UserActions.SetAuthenticated({ email: res.email, password: res.password }));
		}, err => {
			console.log({err});
		})
	}

	login(user: User) {
		this.http.get<User[]>(environment.backend + '/users?email=' + user.email).subscribe(res => {
			if (!res.length) {
				this.uiService.snackbarOpen('User was not founded! Please check your e-mail address.', null, { duration: 3000 })
				console.log('no users founded!');
				return;
			}
			const _user = res[0];
			if (_user.password === user.password) {
				console.log('successs');
				this.store.dispatch(new UserActions.SetAuthenticated(_user));
			} else {
				this.uiService.snackbarOpen('Login failed. Please check your e-mail address and password.', null, { duration: 3000 })
				console.log('invalid!');
			}
		}, err => {
			console.log({ err });
		})
	}

	logout() {
		this.store.dispatch(new UserActions.SetUnauthenticated());
	}

}
