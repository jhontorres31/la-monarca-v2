import { Component } from '@angular/core';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { RouterOutlet } from '@angular/router';
import { Contacto } from "../contacto/contacto";

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Header, Footer, Contacto],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
