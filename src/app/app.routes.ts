import { Routes } from '@angular/router';
import { UsuarioComponent } from './module/usuario/usuario.component';
import { AuthComponent } from './shared/component/auth/auth.component';
import { MainComponent } from './shared/component/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'usuario',
        component: UsuarioComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];
