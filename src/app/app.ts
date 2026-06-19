import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('plantmatica-template');

  basePathImages = `src/assets/images`;
  bgNavbarImage = `${this.basePathImages}/bg-navbar.jpg`;
  logoWhiteImage = `${this.basePathImages}/logo-white.jpg`;

  currentYear = signal(new Date().getFullYear());
}
