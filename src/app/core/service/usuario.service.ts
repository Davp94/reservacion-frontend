import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRequestDto } from '../dto/usuario/usuario.request.dto';
import { UsuarioDto } from '../dto/usuario/usuario.dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl = environment.API_URL;
  constructor(private httpClient: HttpClient) { }

  createUsuario(usuario: UsuarioRequestDto): Observable<UsuarioDto> {
    return this.httpClient.post<UsuarioDto>("http://localhost:3000/usuario", usuario);
  }

  getUsuarios(): Observable<UsuarioDto[]> {
    return this.httpClient.get<UsuarioDto[]>("http://localhost:3000/usuario");
  }

  getUsuarioById(id: number): Observable<UsuarioDto> {
    return this.httpClient.get<UsuarioDto>(`http://localhost:3000/usuario/${id}`);
  }

  updateUsuario(id: number, usuario: UsuarioRequestDto): Observable<UsuarioDto> {
    return this.httpClient.put<UsuarioDto>(`http://localhost:3000/usuario/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/usuario/${id}`);
  }
}
