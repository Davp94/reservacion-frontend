import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EmpresaDto } from '../dto/empresa.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl = environment.API_URL;
  constructor(private httpClient: HttpClient) { 
  }

  getEmpresas(): Observable<EmpresaDto[]> {
    return this.httpClient.get<EmpresaDto[]>(`${this.apiUrl}/empresa`);
  }
}
