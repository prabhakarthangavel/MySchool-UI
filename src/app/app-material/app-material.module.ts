import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatSelectModule, MatProgressSpinnerModule,
MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDatepickerModule, 
MatNativeDateModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ]
})
export class AppMaterialModule { }
