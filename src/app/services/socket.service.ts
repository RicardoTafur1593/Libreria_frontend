import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Libros } from '../protected/interfaces/libros';
import { CartService } from '../protected/services/cart.service';
import { CartItem } from '../protected/interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket,
    private cartService: CartService) {

    this.socket.on('itemAgregado', (libroRegistrado: CartItem) => {
      const valorActualCarrito = this.cartService.getValueCart();
      const libroExistente = valorActualCarrito.find(valor => valor._id === libroRegistrado.book._id);
      if (libroExistente) {
        libroExistente.cantidad = libroRegistrado.cantidad
      } else {
        valorActualCarrito.push({ ...libroRegistrado.book, cantidad: 1 });
      }
      this.cartService.agregarCarrito([...valorActualCarrito])
    });

    this.socket.on('carritoVacio', () => {
      this.cartService.clearCart()
    });

    this.socket.on('itemDelete', (libro: Libros) => {
      const valorActualCarrito = this.cartService.getValueCart();
      const actualizarCarrito = valorActualCarrito.filter(cartItem => cartItem._id !== libro._id);
      this.cartService.agregarCarrito(actualizarCarrito);
    });
  }

  addToCartSocket(libro: Libros) {
    return this.socket.emit('agregarCarrito', libro)
  }

  removeFromCart(libro: Libros) {
    this.socket.emit('removeItem', libro)
  }

  deleteCart() {
    this.socket.emit('deleteCart')
  }





}
