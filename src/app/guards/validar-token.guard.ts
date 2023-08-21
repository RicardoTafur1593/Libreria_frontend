import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor ( private authService: AuthService,
                private router: Router ) {}

  canActivate(): Observable<any> {
    return this.authService.validarToken()
              .pipe(
                tap( ({ok, rol}) => {
                  if ( ok === false && rol !== "USER_ROLE") {
                    this.router.navigateByUrl('/auth');
                  }
                })
              );
  }


  canLoad(): Observable<any> {
    return this.authService.validarToken()  
            .pipe(
              tap( ({ok, rol}) => {
                if ( !ok === false && rol !== "USER_ROLE" ) {
                  this.router.navigateByUrl('/auth');
                }
              })
            );
  }
}
