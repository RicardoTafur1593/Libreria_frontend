import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/protected/interfaces/libros';
import { CartService } from 'src/app/protected/services/cart.service';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  cartItems: Libros[] = [];
  totalCarrito!: number;

  constructor(
    private cartService: CartService,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart
      this.totalCarrito = this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    })
  }

  removeItem(item: Libros) {
    this.socketService.removeFromCart(item)
    // this.cartService.removeFromCart(item);
  }

  clearCart() {
    this.socketService.deleteCart()
    
    //Lo de abajo es sin socket
    // this.cartService.clearCart()
    // return this.cartService.deleteCart().subscribe()
  }
}

