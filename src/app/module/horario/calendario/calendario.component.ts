import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HorarioService } from '../../../core/service/horario.service';
import { ResStore } from '../../../state-management/state.store';
import { HorarioDto } from '../../../core/dto/horario.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit{
  store = inject(ResStore);
  horarios: HorarioDto[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleClick.bind(this),
  };

  constructor(private horarioService: HorarioService, private router: Router){
  }
  ngOnInit(): void {
    this.getHorarios();
  }

  getHorarios(){
    this.horarioService.getHorarios(this.store.empresa()?.id as number).subscribe({
      next: (res: HorarioDto[]) => {
        this.horarios = res
        this.markHorariosCalendar(res);
      },
      error: (err: any) => console.log(err)
    })
  }

  markHorariosCalendar(horarios: HorarioDto[]){
    const event = horarios.map(horario => ({
      title: 'Horario',
      start: horario.fecha,
      allDay: false,
      background: '#ffffff',
      borderColor: '#ffffff'
    }))
    this.calendarOptions.events = event
  }

  handleEventClick(event: any){

  }

  handleClick(event: any){
    console.log(event);

    const horariosFiltered = this.horarios.filter(hor=>hor.fecha == event.fecha);
    this.store.addHorarios(horariosFiltered);
    this.router.navigateByUrl('/reservar');
  }

}
