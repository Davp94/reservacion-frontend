import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../core/service/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa',
  imports: [CommonModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent implements OnInit, AfterViewInit {

  usuarios: any = [];

  constructor(private usuarioService: UsuarioService){
    console.log('EXECUTING CONSTRUCTOR')
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (res: any) => this.usuarios = res,
      error: (err: any) => console.log(err),
      complete: () => console.log('completed observable')
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
    console.log('EXECUTING ON INIT')
  }

  ngAfterViewInit(): void {
    console.log('EXECUTING AFTER VIEW INIT')
  }


}
