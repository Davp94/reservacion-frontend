import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogDto } from '../../dto/confirmation-dialog.dto';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogDto,
  private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ){}

  closeDialog() {
    this.dialogRef.close(false);
  }

  confirmAction() {
    this.dialogRef.close(true)
  }
}
