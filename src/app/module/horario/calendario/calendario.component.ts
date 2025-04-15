import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
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
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.dateClickEvent.bind(this),
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
    console.log("🚀 ~ CalendarioComponent ~ handleEventClick ~ event:", event)

  }

  countHorariosByFecha(date: Date){
    const formatedDate = this.formatDate(date);
    console.log("🚀 ~ CalendarioComponent ~ countHorariosByFecha ~ formatedDate:", formatedDate)
    const countHorariosByDate = this.horarios.filter( horario => {
      const formattedHorario = horario.fecha.substring(0, 10);
      console.log("🚀 ~ CalendarioComponent ~ countHorariosByFecha ~ formattedHorario:", formattedHorario)
      return formatedDate === formattedHorario
    }).length
    return countHorariosByDate
  }

  formatDate(date: Date): string{
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }

  dateClickEvent(event: any){
    console.log(event.date);
    const fechasDisponibles = this.countHorariosByFecha(event.date);
    if(fechasDisponibles > 0){
      const horariosFiltered = this.horarios.filter(hor=>{
        return hor.fecha.substring(0, 10) == this.formatDate(event.date)
      });
      console.log("🚀 ~ CalendarioComponent ~ dateClickEvent ~ horariosFiltered:", horariosFiltered)
      this.store.addHorarios(horariosFiltered);
      this.router.navigateByUrl('/horario/reservar');
    }else {
      console.log('No existen fechas disponivles para realizar la reservacion')
    }
  }

}
