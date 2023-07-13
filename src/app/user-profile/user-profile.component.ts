import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UpdateProfileFormComponent } from '../update-profile-form/update-profile-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { IMovie, IUser } from "../types";

/**
 * Component for the user profile page.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /**
   * Creates an instance of UserProfileComponent.
   * @constructor
   * @param {FetchApiDataService} fetchApiData - The FetchApiDataService used to fetch user data.
   * @param {MatDialog} dialog - The MatDialog service used to open dialogs.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @memberof UserProfileComponent
   * @returns {void}
   */
  ngOnInit(): void {
  }

  /**
   * Opens the update profile dialog.
   * @memberof UserProfileComponent
   * @returns {void}
   */
  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateProfileFormComponent, {
      width: '480px'
    });
  }
}