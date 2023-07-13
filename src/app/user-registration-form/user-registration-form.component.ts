import { Component, OnInit, Input } from '@angular/core';
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
 * Component for the user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatCardModule, MatButtonModule],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * The form group for the registration form.
   */
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    birthday: new FormControl('')
  });

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @constructor
   * @param {FetchApiDataService} fetchApiData - The FetchApiDataService used to register a user.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - The MatDialogRef used to close the dialog.
   * @param {MatSnackBar} snackBar - The MatSnackBar used to display notifications.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar,
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @memberof UserRegistrationFormComponent
   * @returns {void}
   */
  ngOnInit(): void {
  }

  /**
   * Registers a new user.
   * @memberof UserRegistrationFormComponent
   * @returns {void}
   */
  registerUser(): void {
    this.fetchApiData.userRegistration({
      Username: this.registerForm.value.name || '',
      Password: this.registerForm.value.password || '',
      Email: this.registerForm.value.email || '',
      Birthday: this.registerForm.value.birthday || ''
    }).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('User registration is successful', 'OK', {
        duration: 2000
      });
    });
  }
}