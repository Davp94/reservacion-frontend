import { CommonModule, Location } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
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
import { UsuarioDto } from '../../../core/dto/usuario/usuario.dto';
@Component({
  selector: 'app-usuario-form',
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule,MatCardModule, MatSelectModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnInit{

  usuariosForm: FormGroup;
  states: StateDto[];


  constructor(
    private formBuilder: FormBuilder, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsuarioDto,
    @Optional() private dialogRef: MatDialogRef<UsuarioFormComponent>,
    private usuarioService: UsuarioService,
    private localtion: Location,
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

  ngOnInit(): void {
    if(this.data){
      console.log("🚀 ~ UsuarioFormComponent ~ ngOnInit ~ this.data:", this.data)
      this.usuariosForm.patchValue(this.data);
    } 
  }

  onSubmit() {
    if(this.usuariosForm.valid){
      if(this.data){
        const id = this.usuariosForm.controls['id'].value;
        this.usuarioService.updateUsuario(id, this.usuariosForm.value).subscribe({
          next: (res: UsuarioDto) => {
            this.usuariosForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      } else {
        this.usuarioService.createUsuario(this.usuariosForm.value).subscribe({
          next: (res: UsuarioDto) => {
            this.usuariosForm.reset();
            if(this.dialogRef){
              this.dialogRef.close(true);
            }else {
              this.localtion.back();
            }
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
    }
  }

  cancelar() {
    console.log("🚀 ~ UsuarioFormComponent ~ cancelar ~ this.dialogRef:", this.dialogRef)
    if(this.dialogRef){
      this.dialogRef.close(false);
    }else {
      this.localtion.back();
    }
  }



}
