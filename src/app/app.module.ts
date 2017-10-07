import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FoodFormComponent } from './food-form/food-form.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GesundheitscloudService } from './gesundheitscloud.service';
import { DialogHostComponent } from './dialog-host.component';
import { ProductBarcodeScannerComponent } from './product-barcode-scanner/product-barcode-scanner.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FoodFormComponent,
    DialogHostComponent,
    ProductBarcodeScannerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  providers: [
    GesundheitscloudService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogHostComponent],
})
export class AppModule { }
