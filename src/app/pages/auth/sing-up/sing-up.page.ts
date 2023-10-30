import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { initializeApp } from 'firebase/app';
import { UtilsService } from 'src/app/services/utils.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService  // Agregamos FirebaseService al constructor
  ) {
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

  ngOnInit() { }

  async submit() {
    if (this.form.valid) {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      try {
        const user = {
          email: this.form.value.email,
          password: this.form.value.password,
        };

        const res = await this.firebaseSvc.singUp(user);
        console.log("Usuario registrado:", res.user);  // Agregar este log

        if (res.user) {
          const uid = res.user.uid;
          this.form.controls.uid.setValue(uid);
          await this.setUserInfo(uid);
        }

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

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      try {
        let path = `users/${uid}`;
        delete this.form.value.password;

        await this.firebaseSvc.setDocument(path, this.form.value).then(async res => {
          this.utilsSvc.saveInlocalStorage('user', this.form.value);
          this.utilsSvc.routerLink('/main/home');  // Asegurarse de que la ruta sea la correcta
          this.form.reset();
        });

        await this.firebaseSvc.updateProfile(this.form.value.name);
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