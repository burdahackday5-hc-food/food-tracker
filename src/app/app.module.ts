import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FoodFormComponent } from './food-form/food-form.component';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GesundheitscloudService } from './gesundheitscloud.service';

@NgModule({
  declarations: [
    AppComponent,
    FoodFormComponent
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
  ],
  providers: [
    GesundheitscloudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
