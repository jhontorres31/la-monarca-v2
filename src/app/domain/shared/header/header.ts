import { Component, signal, inject } from '@angular/core';
import { Login } from '../../login/login';
import { LoginService } from '../services/login-service';
import { CarService } from '../services/car-service';
import { ProductServices } from '../services/product-services';

import { Cart } from '../../cart/cart';
import { RouterLink, Router } from "@angular/router";



@Component({
  selector: 'app-header',
  imports: [Login, Cart, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  private router = inject(Router);
  private loginService = inject(LoginService);
  public carService = inject(CarService);
  public productService = inject(ProductServices)
  
  hideLogin = signal(false);
  user = this.loginService.currentUser;

  


  toggleLogin() {
    this.hideLogin.update(prevState => !prevState);
  }

  cerrarLogin() {
    this.hideLogin.set(false); 
  }

  logOut(){
    this.loginService.logout();
  }

  onSearch(event: Event){

    const element = event.target as HTMLInputElement;
    this.productService.searchQuery.set(element.value);
  }


  

}
