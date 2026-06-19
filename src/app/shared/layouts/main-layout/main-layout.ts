import { Component } from '@angular/core';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

@Component({
  selector: 'main-layout',
  imports: [Navbar, Footer],
  templateUrl: './main-layout.html',
  styles: ``,
})
export default class MainLayout { }
