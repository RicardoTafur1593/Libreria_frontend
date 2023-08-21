import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from '../../../interfaces/author';
import { AutorService } from '../../../services/autor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autor-dialog',
  templateUrl: './autor-dialog.component.html',
  styleUrls: ['./autor-dialog.component.css']
})
export class AutorDialogComponent implements OnInit {

  formAutor!: FormGroup;
  autores: Author[] = [];

  constructor(
    private fb: FormBuilder,
    private autorServices: AutorService,
    private dialogRef: MatDialogRef<AutorDialogComponent>,
    private autorService: AutorService,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) { }

  ngOnInit(): void {
    this.autorServices.getAuthors().subscribe( resp => this.autores = resp.authors )
    this.formAutor = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      _id: ['']
    })
  }

  btnRegistrarAutor() {
    return this.autorServices.registrarAuthor(this.formAutor.value).subscribe(resp => {
      resp.nombre ? Swal.fire(resp.nombre, 'Registrado', 'success') : Swal.fire(resp, '','error')
    })
  }

  btnEliminarAutor() {
    return this.autorService.deleteAutor(this.formAutor.value).subscribe(resp => {
      resp._id ? Swal.fire('El Autor ha sido', 'Eliminado', 'success') : Swal.fire(resp.msg, '','error')
    })
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }

}
