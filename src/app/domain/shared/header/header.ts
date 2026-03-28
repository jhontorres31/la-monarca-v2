import { Component, signal, inject } from '@angular/core';
import { Login } from '../../login/login';
import { LoginService } from '../services/login-service';
import { CarService } from '../services/car-service';
//import { carmodel } from '../models/car.model';
import { Cart } from '../../cart/cart';


@Component({
  selector: 'app-header',
  imports: [Login, Cart],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  hideLogin = signal(false);
  loginService = inject(LoginService);

  user = this.loginService.currentUser;

  public carService = inject(CarService);

  cart = this.carService.cart;
  total = this.carService.total;
  hideSideMenu = signal(true);



  toggleLogin() {
    this.hideLogin.update(prevState => !prevState);
  }

  cerrarLogin() {
    this.hideLogin.set(false); 
  }

  logOut(){
    this.loginService.logout();
  }

  

}
