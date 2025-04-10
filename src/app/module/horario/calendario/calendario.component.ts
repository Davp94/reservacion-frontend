import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HorarioService } from '../../../core/service/horario.service';
import { ResStore } from '../../../state-management/state.store';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit{
  store = inject(ResStore);
  horarios: any = [];
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

  constructor(private horarioService: HorarioService){
  }
  ngOnInit(): void {
    this.getHorarios();
  }

  getHorarios(){
    this.horarioService.getHorarios(this.store.empresa()?.id as number).subscribe({
      next: (res: any) => {
        this.horarios = res
        this.markHorariosCalendar(res);
      },
      error: (err: any) => console.log(err)
    })
  }

  markHorariosCalendar(horarios: any){
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
  
  }

}
