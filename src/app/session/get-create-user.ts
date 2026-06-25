import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom, catchError, throwError } from 'rxjs';
import { Temporal } from 'temporal-polyfill';
import { type } from 'arktype';
import { UserAuthenticated } from '../../core/users/user-authenticated';
import { UserRegisterData } from '../../core/users/user-register-data';
import { DuplicatedUserError, DuplicatedUserErrorInstance } from '../../core/errors/duplicated-user.error';
import { InternalServerError, InternalServerErrorInstance } from '../../core/errors/internal-server.error';
import { BadRequestError, BadRequestErrorInstance } from '../../core/errors/bad-request.error';

@Service()
export default class UserAuthentication {
  private readonly http = inject(HttpClient);
  public readonly loginUser = (credential: string, password: string) => {
    const req = this.http.post(`/users/login`, {
      credential,
      password,
    });

    return firstValueFrom(req);
  }

  public readonly signUpUser = (userData: UserRegisterData): Promise<UserAuthenticated> => {
    const req = this.http.post<UserAuthenticated>('/users/register', userData)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if( err.status === 409 ){
            const duplicatedError  = DuplicatedUserErrorInstance(err.error);
            if( !(duplicatedError instanceof type.errors) )
              throw new DuplicatedUserError(duplicatedError.message, {cause: duplicatedError.cause}); 
          }
          
         if( err.status === 400 ){
            const badRequestError  = BadRequestErrorInstance(err.error);
            if( !(badRequestError instanceof type.errors) )
              throw new BadRequestErrorInstance(badRequestError.message, {cause: badRequestError.cause}); 
          }
        
          const internalServerError = InternalServerErrorInstance(err.error);  
          if( internalServerError instanceof type.errors )
            throw new InternalServerError('Internal Server Error', {cause: 'Internal Server Error'});
          throw new InternalServerError(internalServerError.message, { cause: internalServerError.cause});          
        }),
    );
    const reqValidated = UserAuthenticated(req) as UserAuthenticated ;
    return firstValueFrom(req);
  }
}
