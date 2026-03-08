import { Component } from '@angular/core';
import { Header } from '../shared/header/header';
import { ListProduct } from '../shared/list-product/list-product';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, ListProduct, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
