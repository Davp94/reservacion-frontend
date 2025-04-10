import { Routes } from '@angular/router';
import { UsuarioComponent } from './module/usuario/usuario.component';
import { AuthComponent } from './shared/component/auth/auth.component';
import { MainComponent } from './shared/component/main/main.component';
import { authGuard } from './core/guard/auth.guard';
import { UsuarioFormComponent } from './module/usuario/usuario-form/usuario-form.component';
import { HorarioComponent } from './module/horario/horario.component';
import { CalendarioComponent } from './module/horario/calendario/calendario.component';
import { ReservacionViewComponent } from './module/horario/reservacion-view/reservacion-view.component';
import { ReservacionComponent } from './module/horario/reservacion/reservacion.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'usuario',
        component: UsuarioComponent,
      },
      {
        path: 'horario',
        component: HorarioComponent,
        children: [
          {
            path: '',
            component: CalendarioComponent
          },
          {
            path: 'reservar',
            component: ReservacionComponent
          },
          {
            path: 'reservaciones',
            component: ReservacionViewComponent
          }
        ]
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'nuevo-registro',
    component: UsuarioFormComponent
  }
];
