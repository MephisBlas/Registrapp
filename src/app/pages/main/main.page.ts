import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    {title:'Inicio', url:'home', icon:'home-outline'},
    {title:'Perfil', url:'profile', icon:'person-outline'},
    {title:'QR Scan', url:'qr', icon:'camera-outline'},
    {title:'Generar QR', url:'generate-qr', icon:'document-outline'}
  ]

  constructor() {
    
  }
  firebaseSvc = inject(FirebaseService);
  utilsSvc= inject(UtilsService);

  router = inject(Router);
  currentPath: string =  '';

  ngOnInit() {
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPath=event.url;
    })
  }
  signOut() {
    // Llama a la función de cierre de sesión en tu servicio Firebase
    this.firebaseSvc.signOut().then(() => {
      // Redirige a la página de autenticación después de cerrar sesión
      // Puedes cambiar 'auth' por la URL de tu página de autenticación
      window.location.href = '/auth';
    });
}
user(): User {
  return this.utilsSvc.getFromLocalStorage('user');
}
}