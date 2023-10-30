import { Injectable, inject } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { IonToast, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  navigateTo(arg0: string) {
    throw new Error('Method not implemented.');
  }

  loadingCtrl = inject(FirebaseService);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  modalCtrl = inject(ModalController);

 
 async takePicture (promptLabelHeader:string){
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt, promptLabelHeader, promptLabelPhoto: 'Selecciona una imagen', promptLabelPicture: 'Captura con tu camara'
  });

};

  /////LOADING/////

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }


  ////TOAST////
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  constructor() { }

  ////Enruta a cualquier pagian disponible////

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
  ////GUARDAR LOCALSTORAGE////
  saveInlocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  ////OBTIENE LOCALSTORAGE////
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

  /////modal//////
  async presentModal(opts: ModalOptions){
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) return data;
  }

  dismissModal(data?:any){
    return this.modalCtrl.dismiss(data);
}

}



