import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';


const publicUrls = ['auth/login', 'auth/register', 'auth/refresh', 'auth/logout'];


export const tokenInterceptor: HttpInterceptorFn = (req: any , next: any) => {
    const token = localStorage.getItem('token'); // ou de algum service
    console.log("Testando")
    debugger
    if (token && !isPublicUrl(req.url)) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next(req);
  }

  


const isPublicUrl =  (url: string): boolean => {
    return publicUrls.some(publicUrl => url.endsWith(publicUrl));
}