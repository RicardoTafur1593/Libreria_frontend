import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorJWTService } from './services/interceptor-jwt.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SidenavComponent } from './protected/components/sidenav/sidenav.component';

const config: SocketIoConfig = { url: 'http://localhost:3000',
  options: {
    extraHeaders: {
      'token': localStorage.getItem('token')!//para enviarle en los headers el token
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorJWTService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
