import { Author } from "./author";

export interface Libros {
    _id: string
    nombre: string,
    sku: number,
    author: Author,
    precio: number,
    disponibilidad: boolean,
    cantidad: number
    sinopsis?: string,
    totalLibros? : number
}

export interface GetLibro {
    total: number;
    books: Libros[]
}

export interface FormLibro {
    nombre: string,
    author:string,
    disponibilidad: boolean,
    precio: number,
    sinopsis: string
}