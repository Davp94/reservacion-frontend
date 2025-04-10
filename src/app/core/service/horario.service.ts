import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  apiUrl = environment.API_URL;
  constructor(private httpClient: HttpClient) { }

    //TODO add dto horarios
    getHorarios(idEmpresa: number): Observable<any[]> {
      return this.httpClient.get<any[]>(`${this.apiUrl}/horario`, {params: {id: idEmpresa}});
    }
}
