import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Service()
export default class GetAndCreateUser {
  private readonly http = inject(HttpClient);

  public readonly loginUser = (credential: string, password: string) => {
    const req = this.http.post(`/users/login`, {
      credential,
      password,
    });

    return firstValueFrom(req);
  }

  public readonly signUpUser = () => {
    throw new Error(`Method not implemented yet`);
  }
}
