import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    correo: ['admin@hotmail.com', [Validators.required, Validators.email]],
    password: ['123123', [Validators.required, Validators.minLength(6)]]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  login(){
    const { correo, password } = this.miFormulario.value;
    this.authService.login(correo, password)
      .subscribe( ({ok, rol}) => {  

        if (ok) {
          if ( rol === "USER_ROLE") {
            this.router.navigateByUrl('/user');
          } if ( rol === "ADMIN_ROLE") {
            this.router.navigateByUrl('/admin')
          }  
        } else {
          Swal.fire('Error', "Correo o contraseña invalida", 'error' );    
        }

      });   
  }
}
