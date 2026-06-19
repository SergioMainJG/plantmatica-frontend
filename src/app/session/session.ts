import { Component, injectAsync, linkedSignal, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { imagesShared } from '../shared/images.shared';
import { LucideEye, LucideEyeOff } from '@lucide/angular';
import Image from '../shared/components/image/image';

interface LoginFormModel {
  emailOrUsername: string;
  password: string;
}

@Component({
  selector: 'app-session',
  imports: [FormField, Image, LucideEyeOff, LucideEye],
  templateUrl: './session.html',
})
export default class Session {
  private readonly getAndCreateUser = injectAsync(() => import('./get-create-user'));
  private async loginUser(credentials: string, password: string) {
    const service = await this.getAndCreateUser();
    return service.loginUser(credentials, password);
  }

  protected readonly loginModel = signal<LoginFormModel>({
    emailOrUsername: '',
    password: '',
  });
  protected readonly loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.emailOrUsername, { message: 'Email is required!' });
    required(schemaPath.emailOrUsername, { message: 'Password is required' });
  });

  protected readonly plantmaticaLogo = imagesShared['plantmaticaImage'];
  protected readonly isPasswordHidden = signal(true);

  protected readonly togglePasswordState = linkedSignal(() => this.isPasswordHidden()
    ? 'Mostra Contraseña' : 'Ocultar Contraseña');

  protected readonly togglePassword = () => {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }

  protected readonly onSubmit = (event: Event) => {
    event.preventDefault();
    submit(this.loginForm, {
      action: async () => {
        const credentials = this.loginModel();
        const resp = await this.loginUser(credentials.emailOrUsername, credentials.password);
        console.log({ resp })
      }
    })
  }
}
