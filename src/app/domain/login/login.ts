import { Component,inject,output, model, signal } from '@angular/core';
import { LoginService } from '../shared/services/login-service';
import { Registro } from '../registro/registro';

@Component({
  selector: 'app-login',
  imports: [Registro],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private loginService = inject(LoginService);
  onClose = output<void>();
  hideRegister = signal(false);
  email = model('');
  password = model('');

  cerrar() {
    this.onClose.emit();
  }

  iniciarSesion() {
    const payload = { email: this.email(), password: this.password() };
  
  this.loginService.login(payload).subscribe({
    next: (res) => {
      console.log('Usuario identificado:', res.user.nombre);
      this.cerrar(); 
      
    },
    error: (err) => {
      console.error('Error:', err.error.error || 'Error de conexión');
      alert(err.error.error || 'Credenciales incorrectas');
    }
  });
  }

  showPassword = signal(false);
  

  toggleRegister() {
    this.hideRegister.update(prevState => !prevState);
  }

  cerrarRegister() {
    this.hideRegister.set(false); 
  }


 

}
