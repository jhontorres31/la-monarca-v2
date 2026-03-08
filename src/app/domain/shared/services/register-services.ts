import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterServices {

  private http = inject(HttpClient);
  private url = 'http://localhost:3000/usuarios';
  

  register(data: {nombresyapellidos:string; cedula: string; email: string; direccion:string, password:string}){
      return this.http.post(this.url, data);
  }
  
}
