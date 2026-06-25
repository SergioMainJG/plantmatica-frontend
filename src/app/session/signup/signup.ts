import { TitleCasePipe } from '@angular/common';
import { Component, injectAsync, linkedSignal, signal, WritableSignal } from '@angular/core';
import { form, FormField, pattern, required, submit, validate, minLength, maxLength } from '@angular/forms/signals';
import { RouterLink, Router } from '@angular/router';
import { LucideEye, LucideEyeOff } from '@lucide/angular';
import { Temporal } from "temporal-polyfill";
import Image from '../../shared/components/image/image';
import { imagesShared } from '../../shared/images.shared';
import { TranslateGenderPipe } from '../../../pipes/translate-gender-pipe';

@Component({
  selector: 'session-login',
  imports: [FormField, Image, LucideEyeOff, LucideEye, RouterLink, TitleCasePipe, TranslateGenderPipe],
  templateUrl: './signup.html',
})
export default class Signup {
  private readonly getAndCreateUser = injectAsync(() => import('../get-create-user'));

  private async signupUser(signupData: SignupFormModel) {
    const service = await this.getAndCreateUser();
    return service.signUpUser(signupData);
  }

  private readonly signupModel = signal<SignupFormModel>({
    name: '',
    email: '',
    password: '',
    repeatedPassword: '',
    residenceStateMexico: 'Selecciona un estado',
    gender: 'Selecciona un género',
    birthdate: '2000-01-01',
    
      isAgeAllowed: false,
      isStateAllowed: false,
      isGenderAllowed: false,
      isMarketingAllowed: false,
      isAdsAllowed: false
  
  });
  protected readonly signupForm = form(this.signupModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Su nombre de usuario es requerido!' });
    minLength(schemaPath.name, 5, { message: "Su nombre de usuario debe ser de mas de 4 caracteres."});
    maxLength(schemaPath.name, 150, { message: "Su nombre de usuario debe ser de menor a 151 caracteres."});
    required(schemaPath.email, { message: 'Tu correo es requerido' });
    pattern(schemaPath.email,
      /^[a-zA-Z0-9!#\$%&\/\(\)\?¿\\\.\-]{5,}@[A-Za-z0-9]{3,}\.[a-z]{2,}$/,
      {
        message: `El correo debe tener:
        - 5 caracters al menos en el propietario del correo (lo descrito antes del '@')
        - 3 caracteres al menos en el dominio que emitre los correos (después del '@')
        - 2 caracteres al menos en la extensión (la última sección del correo, posterior al último punto)`}
    );
    required(schemaPath.password, { message: 'Tu contraseña es requerida' });
    pattern(schemaPath.password, /^(?=.*[A-Z])(?=.*\d).{8,255}$/, {
      message: `La contraseña debe empezar con mayusculas, tener minusculas y números, y tener al menos 8 caracteres)`,
    })
    required(schemaPath.repeatedPassword, { message: 'Repetir la contraseña es obligatorio' });
    validate(schemaPath.repeatedPassword, ({ value, valueOf }) => {
      if (value() === valueOf(schemaPath.password))
        return null;
      return {
        kind: 'Passwords are not equal',
        message: `Las contraseñas no coinciden`
      }
    });
    required(schemaPath.residenceStateMexico, { message: 'Tienes que seleccionar una opción como estado de residencia en México' });
    validate(schemaPath.residenceStateMexico, ({ value }) => {
      if (Object.values(MEXICO_STATES).some((state) => state === value()))
        return null;
      return {
        kind: 'State not valid',
        message: `Selecciona un estado de residencia`,
      }
    })
    required(schemaPath.gender, { message: 'Tú genero es necesario' });
    validate(schemaPath.gender, ({ value }) => {
      if (Object.values(GENDERS).some((gender) => gender === value()))
        return null;
      return {
        kind: `Gender not valid`,
        message: `Selecciona un género`
      }
    })
    required(schemaPath.birthdate, { message: 'Tú fecha de nacimiento es requerdia' });
    validate(schemaPath.birthdate, ({ value }) => {
      const date = Temporal.PlainDate.from(value());
      if (!(date.year > 1905 && date.year < 2010))
        return {
          kind: 'Invalide birthday',
          message: 'La fecha de nacimiento establecida no es válida. No debes tener más de 120 años y menos de 16',
        };
      return null;
    })
  });

  protected readonly plantmaticaLogo = imagesShared['plantmaticaImage'];
  protected readonly isPasswordHidden = signal(true);
  protected readonly isRepeatedPasswordHidden = signal(true);
  protected readonly togglePasswordState = linkedSignal(() => this.isPasswordHidden()
    ? 'Mostra Contraseña' : 'Ocultar Contraseña');
  protected readonly toggleRepeatedPasswordState = linkedSignal(() => this.isRepeatedPasswordHidden()
    ? 'Mostra Contraseña' : 'Ocultar Contraseña');

  protected readonly togglePassword = (passwordSignal: WritableSignal<boolean>) => {
    passwordSignal.set(!passwordSignal());
  }

  protected readonly mexicoStates = Object.values(MEXICO_STATES);
  protected readonly genders = Object.values(GENDERS);
  protected readonly showError = signal(false);
  protected readonly errorSignup = signal('');
  protected readonly isHidingError = signal(false);
  private hideTimeout: NodeJS.Timeout | null = null;
  private destroyTimeout: NodeJS.Timeout | null=null;
  protected readonly isSignedup = signal(false);
  protected readonly username = signal('');
  
  private readonly triggerError = (message: string) => {
    if(this.hideTimeout) clearTimeout(this.hideTimeout);
    if(this.destroyTimeout) clearTimeout(this.destroyTimeout);
    this.errorSignup.set(message);
    this.showError.set(true);
    this.isHidingError.set(false);
    
    this.hideTimeout = setTimeout(() => this.isHidingError.set(true), 5000);
    this.destroyTimeout = setTimeout(() => {
      this.showError.set(false);
      this.isHidingError.set(false);
    }, 5500);
  }
  

  protected readonly onSubmit = (event: Event) => {
    event.preventDefault();
    submit(this.signupForm, {
      action: async () => {
        const signupData = this.signupModel();
        try{
            const resp = await this.signupUser(signupData);
            console.log({resp});
            //this.isSignedup.set(true);
            //this.username.set(resp.user.name);
        } catch( error: unknown) {
            if( !(error instanceof Error) || error.cause === 'Internal Server Error'){
                console.log('Enviar server error');
            }
            if( error instanceof Error ){
             this.triggerError(error.message);
            }
        }
      }
    });
    
  }
}
