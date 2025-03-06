import { Component } from '@angular/core';
import { UsuarioTableComponent } from "./usuario-table/usuario-table.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
@Component({
  selector: 'app-usuario',
  imports: [UsuarioTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

  constructor(private matDialog: MatDialog){

  }
  createUsuario(){
    const dialogRef = this.matDialog.open(UsuarioFormComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log('usuario añadido')
      }
    });
  }
}
