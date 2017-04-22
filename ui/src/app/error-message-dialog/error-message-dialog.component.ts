import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-message-dialog',
  templateUrl: './error-message-dialog.component.html',
  styleUrls: ['./error-message-dialog.component.css']
})
export class ErrorMessageDialogComponent implements OnInit {

  errorMessage: string;

  constructor(private dialogRef: MdDialogRef<ErrorMessageDialogComponent>) { }

  ngOnInit() {
    this.errorMessage = this.dialogRef._containerInstance.dialogConfig.data.errorMessage;
  }
}
