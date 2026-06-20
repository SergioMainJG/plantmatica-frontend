import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Temporal } from 'temporal-polyfill';

interface SignupFormModel {
  birthdate: string;
  email: string;
  gender: string;
  name: string;
  password: string;
  repeatedPassword: string;
  residenceStateMexico: string;
  tracking: {
    isAgeAllowed: boolean;
    isStateAllowed: boolean;
    isGenderAllowed: boolean;
    isMarketingAllowed: boolean;
    isAdsAllowed: boolean;
  }
}

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

  public readonly signUpUser = (userData: SignupFormModel) => {
    const req = this.http.post('/users/register', {
      birthdate: Temporal.PlainDate.from(userData.birthdate),
      email: userData.email,
      gender: userData.gender,
      name: userData.name,
      password: userData.password,
      residenceState: userData.residenceStateMexico,
    })
  }
}
