import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

	constructor(private snackbar: MatSnackBar) { }

  	snackbarOpen (message, action, config) {
		this.snackbar.open(message, action, config);
  	}
}
