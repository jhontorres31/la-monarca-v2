import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/usuarios';

  // Obtenemos los datos de UN solo usuario filtrando por ID
  getUsuarioById(id: number): Observable<UserModel | undefined> {
    return this.http.get<UserModel>(`${this.url}/${id}`);
  
  }
}
