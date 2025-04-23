import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ReservacionSocketService {
  private socket: Socket;
  private newReservacion$ = new Subject<any>();
  apiUrl = environment.API_URL;
  constructor() {
    this.socket = io(this.apiUrl);
    this.socket.on('newReservacion', (reservacion) => {
      this.newReservacion$.next(reservacion);
    })
  }

  getReservacionNotificacion(): Observable<any> {
    return this.newReservacion$.asObservable();
  }
}
