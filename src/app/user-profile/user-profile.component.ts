import {Component, Input, OnInit} from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UpdateProfileFormComponent } from '../update-profile-form/update-profile-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import {IMovie, IUser} from "../types";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }
  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateProfileFormComponent, {
      width: '480px'
    });
  }
}
