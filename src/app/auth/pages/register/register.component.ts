import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }


  registro() {
    const { nombre, correo, password } = this.miFormulario.value;
    this.authService.registro(nombre, correo, password)
    .subscribe( ok => {
      if ( ok === true ){
        this.router.navigateByUrl('/user');//dashboard
      } else {
        Swal.fire('Error', ok, 'error' );
      }
    });
  }


}
