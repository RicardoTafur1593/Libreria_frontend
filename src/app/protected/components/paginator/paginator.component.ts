import { Component, OnInit, Input } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LibrosService } from '../../services/libros.service';
import { AdminComponent } from '../../admin/admin.component';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  standalone: true,
  imports: [MatPaginatorModule],
})
export class PaginatorComponent {

  @Input() totalItems: number = 0;
  totalLibrosConsulta: number = 0;

  constructor(
    private librosService: LibrosService,
    private adminCOmponent: AdminComponent) { }

  paginador(event: PageEvent) {
    let page: number = event.pageIndex + 1;
    this.librosService.obtenerLibros(page).subscribe(resp =>
      this.adminCOmponent.libros = resp.books)
  }

}
