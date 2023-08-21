import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CartModule } from '../components/cart/cart.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SidenavModule } from '../components/sidenav/sidenav.module';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  providers:[
    TitleCasePipe,
    CurrencyPipe
  ],
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    CartModule,
    UserRoutingModule,
    SidenavModule,

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
  ]
})
export class UserModule { }
