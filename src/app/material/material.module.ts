import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';

export const MATERIAL_MODULES = [
  MatDialogModule,
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
];

@NgModule({
  imports: [
    MATERIAL_MODULES
  ],
  exports: [MATERIAL_MODULES],
})
export class MaterialModule {
}
