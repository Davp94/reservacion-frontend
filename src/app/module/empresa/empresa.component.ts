import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../core/service/usuario.service';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../core/service/empresa.service';
import { EmpresaDto } from '../../core/dto/empresa.dto';
import { ResStore } from '../../state-management/state.store';
import { Router } from '@angular/router';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empresa',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent implements OnInit, AfterViewInit {

  empresas: EmpresaDto[] = [];
  store = inject(ResStore);

  constructor(private empresaService: EmpresaService, private router: Router){
    console.log('EXECUTING CONSTRUCTOR')
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe({
      next: (res: EmpresaDto[]) => this.empresas = res,
      error: (err: any) => console.log(err),
      complete: () => console.log('completed observable')
    });
  }

  ngOnInit(): void {
    this.getEmpresas();
    console.log('EXECUTING ON INIT')
  }

  ngAfterViewInit(): void {
    console.log('EXECUTING AFTER VIEW INIT')
  }

  selectEmpresa(empresa: EmpresaDto){
    this.store.addEmpresa(empresa);
    this.router.navigateByUrl('/horario');
  }


}
