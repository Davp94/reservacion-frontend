import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HorarioDto } from '../dto/horario.dto';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  apiUrl = environment.API_URL;
  constructor(private httpClient: HttpClient) { }

    //TODO add dto horarios
    getHorarios(idEmpresa: number): Observable<HorarioDto[]> {
      return this.httpClient.get<HorarioDto[]>(`${this.apiUrl}/horario`, {params: {id: idEmpresa}});
    }
}
