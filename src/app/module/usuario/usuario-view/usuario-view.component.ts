import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OperationEnum } from '../../../shared/enum/operation.enum';
import { UsuarioService } from '../../../core/service/usuario.service';
import { StatePipe } from '../../../shared/pipe/state.pipe';
import { UsuarioDto } from '../../../core/dto/usuario/usuario.dto';
import { UsuarioDataDto } from '../../../shared/dto/usuario/usuario-data.dto';

@Component({
  selector: 'app-usuario-view',
  imports: [CommonModule, MatCardModule, MatDialogModule, MatButtonModule, StatePipe],
  templateUrl: './usuario-view.component.html',
  styleUrl: './usuario-view.component.scss'
})
export class UsuarioViewComponent {

  usuario: UsuarioDto;
  operation: OperationEnum;
  operationEnum: typeof OperationEnum = OperationEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UsuarioDataDto,
    private dialogRef: MatDialogRef<UsuarioViewComponent>,
    private usuarioService: UsuarioService
  ){
    this.usuario = data.data;
    this.operation = data.operation;
  }

  eliminar(id: number){
    this.usuarioService.deleteUsuario(id).subscribe({
      next: res => this.dialogRef.close(true),
      error: err => console.log(err)
    })
  }

}
