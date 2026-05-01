import { Component } from '@angular/core';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
