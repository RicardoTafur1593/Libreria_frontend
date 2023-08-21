import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import Swal from 'sweetalert2';

import { LibrosService } from '../../../services/libros.service';
import { AutorService } from '../../../services/autor.service';
import { CartService } from '../../../services/cart.service';

import { Author } from '../../../interfaces/author';
import { Libros } from '../../../interfaces/libros';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  esEditar: boolean = false;
  autores: Author[] = [];
  libros: Libros[] = [];
  miFormulario!: FormGroup;
  disableSelect = new FormControl(false);

  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private titleCase: TitleCasePipe,
    private libroService: LibrosService,
    private cartService: CartService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private autorService: AutorService,
    @Inject(MAT_DIALOG_DATA) public data: Libros,) {
      this.esEditar = !!data           
  }

  ngOnInit(): void {
    this.obtenerAuthors(); // Obteniendo autores
    this.libroService.obtenerListaLibros().subscribe( resp => this.libros = [...resp])
    this.miFormulario = this.fb.group({
      sku: [this.data?.sku, [Validators.required, Validators.min(8), Validators.max(8)]],
      nombre: [this.titleCase.transform(this.data?.nombre), [Validators.required, Validators.minLength(1)]],
      author: [this.data?.author._id, Validators.required],
      disponibilidad: [this.data?.disponibilidad, [Validators.required, Validators.pattern('^(true|false)$')]],
      precio: [this.data?.precio, Validators.min(0)],
      sinopsis: [this.data?.sinopsis]
    })
  }

  obtenerAuthors() {
    return this.autorService.getAuthors()
      .subscribe( resp => this.autores = resp.authors)
  }

  editarCampos() {
    
    return this.libroService.modificarLibro(this.miFormulario.value, this.data._id)
      .subscribe(resp => {             
      this.data.nombre = resp.nombre,
      this.data.author._id = resp.author._id,
      this.data.author.nombre = resp.author.nombre
      this.data.disponibilidad = resp.disponibilidad,
      this.data.precio = resp.precio,
      this.data.sinopsis = resp.sinopsis

      this.cartService.actualizarCarrito(this.data._id, this.data)
    })
  }

  crearLibro() {  
    return this.libroService.registarLibro(this.miFormulario.value).subscribe( resp => {      
      this.libros.push(resp);
      this.libroService.actualizarListaLibros(this.libros);
      Swal.fire(`Libro ${resp.nombre}`,'Registrado','success')
    })
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }

}
