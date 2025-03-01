import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  createUsuario(usuario: any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:3000/usuario", usuario);
  }

  getUsuarios(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:3000/usuario");
  }

  getUsuarioById(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/usuario/${id}`);
  }

  updateUsuario(usuario: any): Observable<any> {
    return this.httpClient.put<any>("http://localhost:3000/usuario", usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:3000/usuario/${id}`);
  }
}
