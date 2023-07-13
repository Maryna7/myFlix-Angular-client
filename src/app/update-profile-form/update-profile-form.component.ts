import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

/**
 * Component for the update profile form.
 */
@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatCardModule, MatButtonModule],
})
export class UpdateProfileFormComponent implements OnInit {
  /**
   * The form group for the update form.
   */
  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
    birthday: new FormControl('')
  });

  /**
   * Creates an instance of UpdateProfileFormComponent.
   * @constructor
   * @param {FetchApiDataService} fetchApiData - The FetchApiDataService used to update user information.
   * @param {MatSnackBar} snackBar - The MatSnackBar used to display notifications.
   * @param {MatDialogRef<UpdateProfileFormComponent>} dialogRef - The MatDialogRef used to close the dialog.
   * @param {Router} router - The Router used for navigating to different routes.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<UpdateProfileFormComponent>,
      private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @memberof UpdateProfileFormComponent
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Updates the user's information.
   * @memberof UpdateProfileFormComponent
   * @returns {void}
   */
  updateUserInfo(): void {
    this.fetchApiData.editOneUser({
      Username:this.updateForm.value.name || '',
      Email:this.updateForm.value.email || '',
      Password:this.updateForm.value.password || '',
      ConfirmPassword:this.updateForm.value.confirmation || '',
      Birthday:this.updateForm.value.birthday || '',
    }).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open('Your profile was successfully updated', 'OK', {
        duration: 2000
      });
    })
  }

  /**
   * Deletes the user's profile.
   * @memberof UpdateProfileFormComponent
   * @returns {void}
   */
  deleteUser(): void {
    this.fetchApiData.deleteOneUser().subscribe((res) => {
      this.dialogRef.close();
      this.router.navigate(['welcome']);
      localStorage.clear();
      this.snackBar.open('Your profile was deleted', 'OK', {
        duration: 2000
      });
    });
  }
}