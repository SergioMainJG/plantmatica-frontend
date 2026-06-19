import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { imagesShared } from '../shared/images.shared';
import Image from '../shared/components/image/image';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink, Image],
  templateUrl: './homepage.html',
})
export default class Homepage {
  plantmaticaLogo = imagesShared['plantmaticaImage'];
}
