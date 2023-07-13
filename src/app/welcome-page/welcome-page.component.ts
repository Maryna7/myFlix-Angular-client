import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component for the welcome page of the application.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of WelcomePageComponent.
   * @constructor
   * @param {MatDialog} dialog - The MatDialog service used to open dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @memberof WelcomePageComponent
   * @returns {void}
   */
  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog.
   * @memberof WelcomePageComponent
   * @returns {void}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '480px'
    });
  }

  /**
   * Opens the user login dialog.
   * @memberof WelcomePageComponent
   * @returns {void}
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '480px'
    });
  }
}