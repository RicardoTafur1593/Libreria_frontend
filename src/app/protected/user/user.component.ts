import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LibrosService } from '../services/libros.service';
import { Libros } from "../interfaces/libros";
import { CartService } from '../services/cart.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {

  libros: Libros[] = []
  carrito: any[] = []
  openSidenav: boolean = false;
  rol: string = this.usuario.rol;

  mostrarCarrito = false;

  ngOnInit(): void {
    this.obtenerLibros();
    this.obtenerCarrito()
  }

  constructor(
    private authservice: AuthService,
    private librosservice: LibrosService,
    private cartservice: CartService,
    private socketservice: SocketService) {}

  get usuario() {
    return this.authservice.usuario
  }

  obtenerLibros() {
    this.librosservice.obtenerLibros()
      .subscribe(resp => { this.libros = resp.books })
  }

  obtenerCarrito() {
    return this.cartservice.carritoItems().subscribe(resp => {
      this.cartservice.agregarCarrito(resp)
    });
  }

  agregarProducto(index: number) {
    return this.socketservice.addToCartSocket(this.libros[index])
  }

}
