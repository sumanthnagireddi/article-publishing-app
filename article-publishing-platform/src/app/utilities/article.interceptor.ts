import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { catchError, finalize, map, throwError } from 'rxjs';

export const articleInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService)
  loaderService.show();

  return next(req).pipe(
    map(event => {
      console.log(event);
      
      return event
    }),
    catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }),
    finalize(() => {
      setTimeout(() => {
        loaderService.hide()
      }, 0);
    })
  );
};
