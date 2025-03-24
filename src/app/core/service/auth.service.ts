import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequestDto } from '../dto/auth/auth.request.dto';
import { Observable, tap } from 'rxjs';
import { AuthResponseDto } from '../dto/auth/auth.response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;

  constructor(private httClient: HttpClient) { }

  authuser(userCredentials: AuthRequestDto): Observable<AuthResponseDto>{
    return this.httClient.post<AuthResponseDto>('http://localhost:3000/auth', userCredentials).pipe(
      tap((res: AuthResponseDto) => {
        this.token = res.token;
        localStorage.setItem('token', this.token)
      })
    );
  }

  getToken(): string | null {
    if(!this.token){
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  isAuthenticated(): boolean{
    return this.token ? true : false;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }


}
