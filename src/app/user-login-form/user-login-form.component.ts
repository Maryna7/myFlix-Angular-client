import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

/**
 * Component for the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatCardModule, MatButtonModule],

})
export class UserLoginFormComponent implements OnInit {
  /**
   * The form group for the login form.
   */
  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   * Creates an instance of UserLoginFormComponent.
   * @constructor
   * @param {FetchApiDataService} fetchApiData - The FetchApiDataService used to log in a user.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - The MatDialogRef used to close the dialog.
   * @param {MatSnackBar} snackBar - The MatSnackBar used to display notifications.
   * @param {Router} router - The Router used for navigating to different routes.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      private router: Router
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @memberof UserLoginFormComponent
   * @returns {void}
   */
  ngOnInit(): void {
  }

  /**
   * Logs in the user.
   * @memberof UserLoginFormComponent
   * @returns {void}
   */
  loginUser(): void {
    this.fetchApiData.userLogin({
      Username: this.loginForm.value.name || '',
      Password: this.loginForm.value.password || ''
    }).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Login is successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    });
  }
}