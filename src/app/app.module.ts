import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FoodFormComponent } from './food-form/food-form.component';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GesundheitscloudService } from './gesundheitscloud.service';
import { DialogHostComponent } from './dialog-host.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodFormComponent,
    DialogHostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
  providers: [
    GesundheitscloudService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogHostComponent],
})
export class AppModule { }
