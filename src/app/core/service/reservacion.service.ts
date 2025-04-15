import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HorarioDto } from '../dto/horario.dto';
import { PaginationFilterRequestDto } from '../dto/paginationFilterReq.dto';
import { ReservacionRequestDto } from '../dto/reservacion.request.dto';
import { ReservacionDto } from '../dto/reservacion.dto';
import { PaginationDto } from '../dto/paginationDto';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  apiUrl = environment.API_URL;
  constructor(private httpClient: HttpClient) { }

    
    getReservacionesPagination(paginationFilterRequestDto: PaginationFilterRequestDto): Observable<PaginationDto<ReservacionDto>> {
       console.log("🚀 ~ ReservacionService ~ getReservacionesPagination ~ paginationFilterRequestDto:", paginationFilterRequestDto)
       const params: HttpParams = new HttpParams();
       params.append('page', paginationFilterRequestDto.page+'');
       params.append('take', paginationFilterRequestDto.take+'');
       params.append('order', paginationFilterRequestDto.order+'');
       params.append('sortBy', paginationFilterRequestDto.sortBy+'');
       params.append('filter', paginationFilterRequestDto.filter+'');
       params.append('filterBy', paginationFilterRequestDto.filterBy+'');
        return this.httpClient.post<PaginationDto<ReservacionDto>>(`${this.apiUrl}/reservacion/page`, paginationFilterRequestDto);
    }

    generateReportReservaciones(usuarioId: number): Observable<Blob>{
        return this.httpClient.get(`${this.apiUrl}/reporte/reservacion/${usuarioId}`, {responseType: 'blob'})
    }

    createReservacion(reservacionRequestDto: ReservacionRequestDto): Observable<ReservacionDto>{
        return this.httpClient.post<ReservacionDto>(`${this.apiUrl}/reservacion`, reservacionRequestDto);
    }
}
