export interface Usuario {
    uid: string,
    nombre: string,
    correo: string, 
    rol: string,
}
export interface AuthResponse {
    _id?: string,
    nombre?: string,
    correo?: string,
    usuario?: Usuario,
    rol: string,  
    token?: string,
    msg?: string,
    ok: boolean
}

export interface ValidarToken {
    ok: boolean,
    rol?: string
}