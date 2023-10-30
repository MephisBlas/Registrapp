import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc= inject(UtilsService);

  ngOnInit() {
  }
  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ///////TOMAR/SELECCIONAR IMAGEN//////////
  async takeImage() {
    let user = this.user();
    const dataUrl = (await this.utilsSvc.takePicture('imagen de perfil')).dataUrl;

    let imagePath = `${user.uid}/profile}`;
    user.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

  }

  
}
