import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast=inject(ToastrService)

  return next(req).pipe(catchError((err)=>{
    toast.error(err.error.message,'',{
      progressBar:true,
      timeOut:1500
    });
    return throwError(()=>err)
  }));
};
