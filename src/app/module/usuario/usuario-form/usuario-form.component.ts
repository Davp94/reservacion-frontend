import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../core/service/usuario.service';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { StateDto } from '../../../shared/dto/state.dto';
import { stateValues } from '../../../shared/constant/state.values';
import { StateEnum } from '../../../shared/enum/state.enum';
@Component({
  selector: 'app-usuario-form',
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule,MatCardModule, MatSelectModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {

  usuariosForm: FormGroup;
  states: StateDto[];


  constructor(
    private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UsuarioFormComponent>,
    private usuarioService: UsuarioService
  ){
    this.usuariosForm = this.formBuilder.group({
      id: [0],
      nombres: '',
      apellidos: '',
      username: '',
      password: '',
      correo: '',
      estado: 0
    })
    this.states = stateValues;
  }

  onSubmit() {
    if(this.usuariosForm.valid){
      if(this.data){
        this.usuarioService.updateUsuario(this.usuariosForm.value).subscribe({
          next: (res: any) => {
            this.usuariosForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      } else {
        this.usuarioService.createUsuario(this.usuariosForm.value).subscribe({
          next: (res: any) => {
            this.usuariosForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
    }
  }



}
