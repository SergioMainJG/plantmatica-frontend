import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
    return next(req);
  }

  const baseUrl = environment.baseBackendUrl;
  const apiPath = req.url.startsWith('/') ? req.url : `/${req.url}`;

  const fullUrl = `${baseUrl}${apiPath}`;


  return next(req.clone({ url: fullUrl }));
};