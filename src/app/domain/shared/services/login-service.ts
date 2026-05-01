import { Injectable, PLATFORM_ID, inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { loginModel } from '../models/login.model';
import { tap } from 'rxjs'; 


interface LoginResponse {
  success: boolean;
  message: string;
  user: loginModel;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private url = 'http://localhost:3000/login';

  currentUser = signal<loginModel | null>(this.getUserFromStorage());

  login(credentials: { email: string; password: string }) {
    return this.http.post<LoginResponse>(this.url, credentials).pipe(
      tap((res) => {
        if (res.success && res.user) {
          this.saveSession(res.user); 
        }
      })
    );
    
  }

  private getUserFromStorage(): loginModel | null {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('user_session');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  private saveSession(user: loginModel) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_session', JSON.stringify(user));
    }
    this.currentUser.set(user);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user_session');
    }
    this.currentUser.set(null);
  }
}