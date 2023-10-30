import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { initializeApp } from 'firebase/app';
import { UtilsService } from 'src/app/services/utils.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private loadingController: LoadingController,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {
    // Inicializa Firebase en el constructor
    const firebaseConfig = {
      apiKey: "AIzaSyBu2PMqIOX3fgn1aiPTRvk10jD0B1C84MY",
      authDomain: "registrapp-d5f07.firebaseapp.com",
      projectId: "registrapp-d5f07",
      storageBucket: "registrapp-d5f07.appspot.com",
      messagingSenderId: "201170879148",
      appId: "1:201170879148:web:9369f5f21782886719d509",
      measurementId: "G-L0ZDQYYM8J"
    };

    initializeApp(firebaseConfig);
  }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      try {
        const res = await this.firebaseSvc.singIn(this.form.value as User);

        this.getUserInfo(res.user.uid);
      } catch (error) {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle'
        });
      } finally {
        await loading.dismiss();
      }
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      try {
        let path = `users/${uid}`;
    
        const user = await this.firebaseSvc.getDocument(path) as User;
        this.utilsSvc.saveInlocalStorage('user', user);
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();
        
        this.utilsSvc.presentToast({
          message: `Te damos la Bienvenida ${user.name}`,
          duration: 2500,
          color: 'primary',
          position: 'middle',
        });
      } catch (error) {
        console.log(error);
    
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
        });
      } finally {
        await loading.dismiss();
      }
    }
  }
}
