import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import Image from "../image/image";
import { imagesShared } from '../../images.shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [RouterLink, Image],
})
export default class Navbar {
  toHomepageTitle = 'Home'
  logoWhiteImage = imagesShared['tucanSoftwareLogoWhite'];
}
