export interface Author {
    _id?: string,
    nombre: string,
    msg?: string,
}

export interface getAuthor{
    total: number,
    authors: Author[]
}