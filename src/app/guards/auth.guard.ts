import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService,
    private afAuth: AngularFireAuth // Inyecta AngularFireAuth
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = localStorage.getItem('user');

    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged((auth) => { // Utiliza afAuth para onAuthStateChanged
        if (auth) {
          if (user) resolve(true);
        } else {
          this.utilSvc.routerLink('/auth');
          resolve(false);
        }
      });
    });
  }
}
