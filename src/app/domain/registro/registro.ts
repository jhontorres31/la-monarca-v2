import { Component, output, inject, model, signal } from '@angular/core';
import { RegisterServices } from '../shared/services/register-services';

@Component({
  selector: 'app-registro',
  imports: [],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private registerServices = inject(RegisterServices);
  onClose = output<void>();
  nombresyapellidos = model('');
  cedula = model('');
  email = model('');
  direccion = model ('');
  password = model ('');
  ciudad = model ('');
  telefono = model ('');

  cerrar() {
    this.onClose.emit();
  }

  registrarUsuario(){

    const body = {nombresyapellidos: this.nombresyapellidos(), cedula: this.cedula(), email: this.email(), telefono: this.telefono(), ciudad: this.ciudad(), direccion: this.direccion(), password: this.password()};
  
    this.registerServices.register(body).subscribe({
      next: (res) =>{
        console.log('registro exitoso', res);
        this.cerrar();
        
      },
      error: (err) => console.log('Error al registrar', err)
      
    }); 

  }
}
