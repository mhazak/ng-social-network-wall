import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor (private userService: UserService) {}

  	title = 'social-network-wall';

  	ngOnInit() {
		this.userService.initAuthListener();
  	}
}
