import { Usuario } from "src/app/auth/interfaces/interfaces";
import { Libros } from "./libros";



export interface CartItem {
    _id: string,
    cart: string,
    book: Libros,
    cantidad: number
}

export interface GetCartItem {
    book: Libros,
    cantidad: number
}
