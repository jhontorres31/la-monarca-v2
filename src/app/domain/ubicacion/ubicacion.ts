import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-ubicacion',
  imports: [],
  templateUrl: './ubicacion.html',
  styleUrl: './ubicacion.css',
})
export class Ubicacion {

   mapaUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1!2d-75.2224099!3d4.4340019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c546d0d58567:0x778d55e34d9bd47f!2sLa+Monarca+estanco!5e0!3m2!1ses!2sco!4v1'
  );
}

}
