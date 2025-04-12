import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResStore } from '../../../state-management/state.store';
import { HorarioDto } from '../../../core/dto/horario.dto';
import { HorarioService } from '../../../core/service/horario.service';
import { ReservacionService } from '../../../core/service/reservacion.service';
import { ConfirmationDialogComponent } from '../../../shared/component/confirmation-dialog/confirmation-dialog.component';
import { ReservacionRequestDto } from '../../../core/dto/reservacion.request.dto';
import { ReservacionDto } from '../../../core/dto/reservacion.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservacion',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './reservacion.component.html',
  styleUrl: './reservacion.component.scss'
})
export class ReservacionComponent implements OnInit{
  store = inject(ResStore);
  horarios: HorarioDto[] | null = [];
  constructor(private horarioService: HorarioService, 
    private reservacionService: ReservacionService, 
    private matDialog: MatDialog,
  private router: Router){}
  
  ngOnInit(): void {
    this.horarios = this.store.horarios();
  }

  realizarReservacion(horario: HorarioDto){
    const dialogRef= this.matDialog.open(ConfirmationDialogComponent, {data: {title: 'Realizar Reservacion', subtitle: 'Esta seguro de realizar la reservacion', confirmationText: 'RESERVAR'}})
    dialogRef.afterClosed().subscribe((response: boolean) => {
      if(response){
        const dataReservacion: ReservacionRequestDto = {
          comentario: '',
          horarioId: horario.id,
          usuarioId: this.store.userData()?.id as number
        }
        this.reservacionService.createReservacion(dataReservacion).subscribe({
          next : (res: ReservacionDto) => this.router.navigateByUrl('/reservaciones'),
          error: (err:any) => console.log(err)
        })
      }
    })
  }

}
