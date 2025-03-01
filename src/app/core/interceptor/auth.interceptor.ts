import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const autService = inject(UsuarioService);
  return next(req);
};
