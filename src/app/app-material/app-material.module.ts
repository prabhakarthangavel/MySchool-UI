import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatSelectModule, MatProgressSpinnerModule,
MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDatepickerModule, 
MatNativeDateModule } from '@angular/material';

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
    MatNativeDateModule 
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
    MatNativeDateModule 
  ]
})
export class AppMaterialModule { }
