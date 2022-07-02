import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})

export class UsermenuComponent implements OnInit {

  	constructor(private userService: UserService) { }

	ngOnInit(): void {
	}

	onLogout () {
		this.userService.logout();
  	}

}
