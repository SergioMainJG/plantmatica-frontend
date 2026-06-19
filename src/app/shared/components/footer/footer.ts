import { Component, signal } from '@angular/core';
import Image from '../image/image';
import { imagesShared } from '../../images.shared';

@Component({
  selector: 'app-footer',
  imports: [Image],
  templateUrl: './footer.html',
  styles: ``,
})
export default class Footer {
  githubFrontUrl = "https://github.com/SergioMainJG/plantmatica-frontend";
  githubImage = imagesShared['githubImage'];
  currentYear = signal(new Date().getFullYear());
}
