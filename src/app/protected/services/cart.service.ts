import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Libros } from '../interfaces/libros';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartItem } from '../interfaces/cart';
import { SocketService } from 'src/app/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: string = environment.baseUrl;
  private cart = new BehaviorSubject<Libros[]>([]);

  constructor( private http: HttpClient ) { }

  getCart() {
    return this.cart.asObservable();
  }

  getValueCart() {
    return this.cart.getValue();
  }

  carritoItems(): Observable<Libros[]>{
    const url = `${this.baseUrl}/carts`;
    return this.http.get<CartItem[]>(url)
      .pipe(  
        map( resp => resp.map( valor => {
          return {
            ...valor.book,
            cantidad: valor.cantidad
          }
        })))
  }

  //esta parte se desarolla por socket
  addToCart(producto: Libros) {    
    const url = `${this.baseUrl}/carts`;
   
    const valorActualCarrito = this.cart.getValue();
    const libroExistente = valorActualCarrito.find(l => l._id === producto._id);
    
    if (libroExistente) {
      libroExistente.cantidad++;
    } else {
      valorActualCarrito.push({ ...producto, cantidad: 1 });
    }
    
    this.cart.next([...valorActualCarrito]);
    return this.http.post(url, {book: producto._id})
  }

  //esta parte se desarolla por socket
  removeFromCart(libro: Libros) {
    const valorActualCarrito = this.cart.getValue();
    const actualizarCarrito = valorActualCarrito.filter(cartItem => cartItem !== libro);
    this.cart.next(actualizarCarrito);
  }

  actualizarCarrito(_id:string, data: Libros) {
    const obtenerCarrito = this.cart.getValue();
    const actualizarLibro = obtenerCarrito.map(libro => {
      if(libro._id === data._id) {
        return {...libro, 
          nombre: data.nombre,
          disponibilidad: data.disponibilidad,
          precio: data.precio,
          sinopsis: data.sinopsis
        }
      }
      return {...libro}
    })
    this.cart.next(actualizarLibro)    
  }

  agregarCarrito(libros: Libros[]) {
    this.cart.next(libros);
  }
  
  clearCart() {
    this.cart.next([]);
  }

  //esta parte se desarolla por socket
  deleteCart() {
    const url = `${this.baseUrl}/carts`;
    return this.http.delete(url)
  }

}
