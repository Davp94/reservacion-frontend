import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UsuarioService } from '../../../core/service/usuario.service';
@Component({
  selector: 'app-usuario-table',
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.scss'
})
export class UsuarioTableComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'username', 'password', 'correo', 'estado'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private usuarioService: UsuarioService){
    
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (res: any) => this.dataSource.data = res,
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
    
}
