import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UsuarioService } from '../../../core/service/usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OperationEnum } from '../../../shared/enum/operation.enum';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { UsuarioViewComponent } from '../usuario-view/usuario-view.component';
import { StatePipe } from '../../../shared/pipe/state.pipe';
@Component({
  selector: 'app-usuario-table',
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, StatePipe],
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.scss'
})
export class UsuarioTableComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'username', 'password', 'correo', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  operation: typeof OperationEnum = OperationEnum;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private usuarioService: UsuarioService, private matDialog: MatDialog){
    
  }

  ngOnInit(): void {
   this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (res: any) => this.dataSource.data = res,
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(operation: OperationEnum, data: any){
    switch (operation) {
      case OperationEnum.UPDATE: {
        const dialogRef = this.matDialog.open(UsuarioFormComponent, {
          data: data,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadUsuarios();
          }
        });
        break;
      }
      case OperationEnum.READ:
      case OperationEnum.DELETE: {
        const dialogRef = this.matDialog.open(UsuarioViewComponent, {
          data: {data, operation}
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadUsuarios();
          }
        });
        break;
      }
    }
  }
    
}
