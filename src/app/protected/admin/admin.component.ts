import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CartService } from '../services/cart.service';
import { LibrosService } from '../services/libros.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Libros } from '../interfaces/libros';

import { DialogComponent } from './components/dialog/dialog.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  
  libros: Libros[] = []
  carrito: any[] = []
  totalLibros: number = 0;

  openSidenav: boolean = false;
  rol: string = this.usuario.rol;
  
  mostrarCarrito = false;
  
  ngOnInit(): void {
    this.librosservice.obtenerLibros().subscribe(resp => {     
      this.libros = resp.books
      this.totalLibros = resp.total 
    });
    this.obtenerCarrito();
  }

  constructor( 
    private authservice: AuthService,
    private librosservice: LibrosService,
    private cartservice: CartService,
    private dialog: MatDialog ) { }

  //obtener usuario
  get usuario() {
    return this.authservice.usuario
  }
 
  //edit, create, eliminar libros
  editarLibro(libro: Libros ) {
    this.dialog.open(DialogComponent, {
      data: libro
    });
  }

  elimnarLibro(idLibro: string) {
    return this.librosservice.deleteLibro(idLibro).subscribe( resp => {
      const listadoLibros = this.libros.filter(valor => valor._id !== resp._id)
      this.librosservice.actualizarListaLibros(listadoLibros),
      Swal.fire(`Libro ${resp.nombre}`,'Eliminado','success')
    })
  }

  //agregar el libro al carrito
  agregarProducto(libro: Libros) {
    return this.cartservice.addToCart(libro).subscribe()
  }

  //manterner carrito
  obtenerCarrito() {
    return this.cartservice.carritoItems().subscribe( resp => {
      this.cartservice.agregarCarrito(resp)      
    });    
  }

}
