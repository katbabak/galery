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

    .error-array-block {
      margin: 10px 0;
    }

    .error-array-block:after {
      content: ' ';
      display: block;
      width: 100%;
      height: 2px;
      margin-top: 10px;
      background: -moz-linear-gradient(left,
      rgba(229, 108, 54, 0) 0%,
      rgba(229, 108, 54, 0.8) 20%,
      rgba(229, 108, 54, 1) 53%,
      rgba(229, 108, 54, 0.8) 79%,
      rgba(229, 108, 54, 0) 100%);
      background: -o-linear-gradient(left,
      rgba(229, 108, 54, 0) 0%,
      rgba(229, 108, 54, 0.8) 20%,
      rgba(229, 108, 54, 1) 53%,
      rgba(229, 108, 54, 0.8) 79%,
      rgba(229, 108, 54, 0) 100%);
      background: linear-gradient(to right,
      rgba(229, 108, 54, 0) 25%,
      rgba(229, 108, 54, 0.8) 40%,
      rgba(229, 108, 54, 1) 60%,
      rgba(229, 108, 54, 0.8) 0%,
      rgba(229, 108, 54, 0) 75%)
    }

    .lot-name {
      font-weight: bold;
      font-size: 20px;
      padding-bottom: 10px;
    }

    .messages-block {
      text-align: justify;
    }

    .btn-actions {
      text-align: center;
      width: 100%;
      display: block;
    }

    .icon {
      margin-bottom: 10px;
    }

    .circle-bad.mat-icon {
      width: auto;
    }

    .circle-bad.material-icons {
      font-size: 45px;
    }

    .btn-ok {
      border: 2px solid rgba(185, 16, 36, 0.3);
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
