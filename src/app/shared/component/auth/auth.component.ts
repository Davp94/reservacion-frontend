import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { AuthRequestDto } from '../../../core/dto/auth/auth.request.dto';
import { Router, RouterLink } from '@angular/router';
import { AuthResponseDto } from '../../../core/dto/auth/auth.response.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  private _snackBar = inject(MatSnackBar);
  constructor(private authService: AuthService, private router: Router){

  }
  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  loginUser(){
    const credentiales: AuthRequestDto = {
      username: this.username,
      password: this.password
    };
    this.authService.authuser(credentiales).subscribe({
      next: (res: AuthResponseDto) => {
        this.openSnackBar('Login SUCCESS', 'OK')
        this.router.navigateByUrl('/')
      },
      error: (err: any) => {
        console.log('ERROR AUTHENTICACION')
        this.openSnackBar('ERROR AUTH', 'OK')
      }
    })
  }
}
