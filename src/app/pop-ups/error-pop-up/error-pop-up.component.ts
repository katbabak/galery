import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-error-pop-up',
  template: `
    <div class="dialog-container">
      <div class="btn-actions" mat-dialog-actions>
        <div class="dialog-content" mat-dialog-content>
          <p [innerHtml]="data.message"></p>
        </div>
        <div>
          <br>
          <br>
          <button class="btn-ok" mat-button (click)="onNoClick()">OK</button>
        </div>
      </div>
    </div>`,
  styles: [`
    .dialog-container {
      color: rgb(229, 108, 54);
    }

    .dialog-content {
      text-align: center;
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
    }

    .btn-actions {
      text-align: center;
      width: 100%;
      display: block;
    }

    .btn-ok {
      border: 2px solid rgba(185, 16, 36, 0.3);
      padding: 10px;
      max-width: 100px;
      width: 100%;
      background-color: antiquewhite;
      color: darkred;
      outline: none;
      cursor: pointer;
    }
  `]
})
export class ErrorPopUpComponent {

  constructor(public dialogRef: MatDialogRef<ErrorPopUpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.data.purchaseErrorArray = [];
    this.dialogRef.close();
  }
}
