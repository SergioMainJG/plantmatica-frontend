import { Component, injectAsync, linkedSignal, signal, WritableSignal } from '@angular/core';
import { form, FormField, pattern, required, submit, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Temporal } from "temporal-polyfill";
import { LucideEye, LucideEyeOff } from '@lucide/angular';
import Image from '../../shared/components/image/image';
import { imagesShared } from '../../shared/images.shared';
import { TitleCasePipe } from '@angular/common';
import { TranslateGenderPipe } from '../../../pipes/translate-gender-pipe';

export const MEXICO_STATES = {
  outside: "Resido fuera del pais",
  aguascalientes: "Aguascalientes",
  bajaCalifornia: "Baja California",
  bajaCaliforniaSur: "Baja California Sur",
  campeche: "Campeche",
  chiapas: "Chiapas",
  chihuahua: "Chihuahua",
  coahuila: "Coahuila de Zaragoza",
  colima: "Colima",
  cdmx: "CDMX",
  durango: "Durango",
  guanajuato: "Guanajuato",
  guerrero: "Guerrero",
  hidalgo: "Hidalgo",
  jalisco: "Jalisco",
  estado: "Estado de Mexico",
  michoacan: "Michoacan de Ocampo",
  morelos: "Morelos",
  nayarit: "Nayarit",
  nuevo: "Nuevo Leon",
  oaxaca: "Oaxaca",
  puebla: "Puebla",
  queretaro: "Queretaro de Arteaga",
  quintana: "Quintana Roo",
  sanLuisPotosi: "San Luis Potosi",
  sinaloa: "Sinaloa",
  sonora: "Sonora",
  tabasco: "Tabasco",
  tamaulipas: "Tamaulipas",
  tlaxcala: "Tlaxcala",
  veracruz: "Veracruz de Ignacio de la Llave",
  yucatan: "Yucatan",
  zacatecas: "Zacatecas",
} as const;

export const GENDERS = {
  male: "Male",
  female: "Female",
  unknown: "I prefer not comment about it",
} as const;

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
    tracking: {
      isAgeAllowed: false,
      isStateAllowed: false,
      isGenderAllowed: false,
      isMarketingAllowed: false,
      isAdsAllowed: false
    }
  });
  protected readonly signupForm = form(this.signupModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Su nombre de usuario es requerido!' });
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
      message: `El correo debe empezar con mayusculas, tener minusculas y números, y tener al menos 8 caracteres)`,
    })
    required(schemaPath.repeatedPassword, { message: 'Tienes que verificar tu contraseña' });
    validate(schemaPath.repeatedPassword, ({ value, valueOf }) => {
      if (value() === valueOf(schemaPath.password))
        return null;
      return {
        kind: 'Passwords are not equal',
        message: `Las contraseñas no coinciden`
      }
    });
    required(schemaPath.residenceStateMexico, { message: 'Tienes que seleccionar una opción como estado de residencia en México' });
    validate(schemaPath.repeatedPassword, ({ value }) => {
      if (Object.keys(MEXICO_STATES).some((state) => state === value()))
        return null;
      return {
        kind: 'State not valid',
        message: `Selecciona un estado de residencia`,
      }
    })
    required(schemaPath.gender, { message: 'Tú genero es necesario' });
    validate(schemaPath.gender, ({ value }) => {
      if (Object.keys(GENDERS).some((gender) => gender === value()))
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



  protected readonly onSubmit = (event: Event) => {
    event.preventDefault();
    submit(this.signupForm, {
      action: async () => {
        const signupData = this.signupModel();
        const resp = await this.signupUser(signupData);
        console.log({ resp })
      }
    })
  }
}
