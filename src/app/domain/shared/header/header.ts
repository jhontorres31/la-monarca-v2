import { Component, signal, inject } from '@angular/core';
import { Login } from '../../login/login';
import { LoginService } from '../services/login-service';


@Component({
  selector: 'app-header',
  imports: [Login],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  hideLogin = signal(false);
  loginService = inject(LoginService);

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

}
