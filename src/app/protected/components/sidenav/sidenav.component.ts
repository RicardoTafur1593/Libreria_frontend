import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../admin/components/dialog/dialog.component';
import { AutorDialogComponent } from '../../admin/components/autor-dialog/autor-dialog.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @Input() open: boolean = false;
  @Input() rolUser!: string;

  constructor(
    private dialog: MatDialog
  ) {}


  validarRol = () => this.rolUser === "ADMIN_ROLE" ? true : false;

  registrarLibro() {
    this.dialog.open(DialogComponent);
  }

  registrarAutor() {
    this.dialog.open(AutorDialogComponent);
  };
  
  eliminarAutor() {
    this.dialog.open(AutorDialogComponent, {
      data: true
    });
  }

}
