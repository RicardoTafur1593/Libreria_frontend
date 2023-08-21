import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario, ValidarToken } from '../interfaces/interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario }
  }

  constructor( private http: HttpClient ) { }

  login(correo: string, password: string) {

    const url = `${this.baseUrl}/auth/login`;
    const body = { correo, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {   
          if ( resp.token ){
            localStorage.setItem('token', resp.token!); 
          }
        }),        
        map( resp => ({ok: resp.ok, rol: resp.usuario?.rol}) ),
        catchError( err => of( err.error.msg ) )
      );
  }



  registro(nombre:string, correo:string, password:string){

    const url = `${this.baseUrl}/usuarios`;
    const body = { nombre, correo, password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( ({ok, token}) => {
          if ( ok ){
            localStorage.setItem('token', token!);
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of( err.error.msg ) )
      );
  }



  validarToken(): Observable<ValidarToken> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, {headers: headers} )
            .pipe(
              map( resp => {
                localStorage.setItem('token', resp.token!);
                this._usuario = {
                  uid: resp._id!,
                  nombre: resp.nombre!,
                  correo: resp.correo!,
                  rol: resp.rol!
                }
                return {ok: resp.ok, rol: resp.rol};
              }),              
              catchError( err => of({ ok: false }))
            );
  }


}
