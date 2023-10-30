import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { initializeApp } from 'firebase/app';
import { UtilsService } from 'src/app/services/utils.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular'; 
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {
@Input() produt: Product 

  form = new FormGroup({
    id: new FormControl(''),
    seccion: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    image: new FormControl('', [Validators.required]),

  });

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService,
    private modalController: ModalController,
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


  user = {} as User;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user')
  }



  ///////TOMAR/SELECCIONAR IMAGEN//////////
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('imagen QR')).dataUrl;
    this.form.controls.image.setValue(dataUrl);

  }

submit(){

}
//////crear roducto
  async createProduct () {
    if (this.form.valid) {

      let path = `user/${this.user.uid}/products`

      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      try {
        const user = {
          seccion: this.form.value.seccion,
          name: this.form.value.name,
          image: this.form.value.name,
        };

        //////////subir imagen y obtener url////////////

        let dataUrl = this.form.value.image;
        let imagePath = `${this.user.uid}/${Date.now()}`;
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
        this.form.controls.image.setValue(imageUrl);

        this.firebaseSvc.addDocument(path, this.form.value).then(async res =>{
          
          this.firebaseSvc.dismissModal();

          this.utilsSvc.presentToast({
            message: 'Qr agregado correctamente',
            duration: 2500,
            color: 'primary',
            position: 'middle',
          });
        })
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