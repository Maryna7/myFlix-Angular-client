
import { Component, Inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogData } from "../types";

/**
 * Component for displaying card info modal.
 */
@Component({
    selector: 'app-card-info-modal',
    templateUrl: './card-info-modal.component.html',
    styleUrls: ['./card-info-modal.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, NgIf, NgForOf],
})
export class CardInfoModalComponent {
    /**
     * The data passed to the card info modal.
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialogRef: MatDialogRef<CardInfoModalComponent>,
    ) {}
}