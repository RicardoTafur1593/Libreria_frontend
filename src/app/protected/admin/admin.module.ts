import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CartModule } from 'src/app/protected/components/cart/cart.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';


import { DialogComponent } from './components/dialog/dialog.component';
import { AutorDialogComponent } from './components/autor-dialog/autor-dialog.component';
import { SidenavModule } from '../components/sidenav/sidenav.module';
import { PaginatorComponent } from '../components/paginator/paginator.component';

@NgModule({
  providers: [
    CurrencyPipe,
    TitleCasePipe,
  ],
  declarations: [
    AdminComponent,
    DialogComponent,
    AutorDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CartModule,
    SidenavModule,
    PaginatorComponent,

    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule

  ],
})
export class AdminModule { }
