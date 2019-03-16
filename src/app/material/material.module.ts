import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

export const MATERIAL_MODULES = [
  MatDialogModule,
  MatIconModule,
];

@NgModule({
  imports: [
    MATERIAL_MODULES
  ],
  exports: [MATERIAL_MODULES],
})
export class MaterialModule {
}
