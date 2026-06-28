import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem("authToken");

  if(!token || req.url.includes("/auth/login")){
    return next(req);
  }

    const clonedReq=req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clonedReq);
};
