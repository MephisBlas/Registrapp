import { Component, OnInit, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { Product } from 'src/app/models/product.model';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de importar tu servicio Firebase
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { LoadingController, ToastController } from '@ionic/angular';
import { deleteDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private firebaseService: FirebaseService) {
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
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  loadingController = inject(LoadingController);

  products: Product[] = [];

  ngOnInit() {
    // Tu código de inicialización
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProducts();

  }

  //obtener productos//
  getProducts() {
    let path = `user/${this.user().uid}/products`;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.products = res;
        console.log(res);
        sub.unsubscribe();
      }
    })
  }


  signOut() {
    // Llama a la función de cierre de sesión en tu servicio Firebase
    this.firebaseService.signOut().then(() => {
      // Redirige a la página de autenticación después de cerrar sesión
      // Puedes cambiar 'auth' por la URL de tu página de autenticación
      window.location.href = '/auth';
    });
  }
  appUdateProduct(product?: Product) {
    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      componentProps: { product }
    })
  }

  async deleteProduct(product: Product) {
    let path = `user/${this.user().uid}/products/${product.id}`;

    const loading = await this.loadingController.create({
      message: 'Eliminando...',
    });
    await loading.present();

    try {
      // Elimina el producto de la base de datos
      await this.firebaseSvc.deleteDocument(path);

      let imagePath = await this.firebaseSvc.getFilePath(product.image)
      await this.firebaseSvc.deleteFile(imagePath);

      this.firebaseSvc.deleteDocument(path).then(async res => {
        this.products = this.products.filter(p => p.id !== product.id);
        this.utilsSvc.presentToast({
          message: 'Producto eliminado correctamente',
          duration: 2500,
          color: 'danger',
          position: 'middle',
        });
      })

      // Actualiza la lista de productos después de eliminar

    } catch (error) {
      console.log(error);

      this.utilsSvc.presentToast({
        message: 'Error al eliminar el producto',
        duration: 2500,
        color: 'danger',
        position: 'middle',
      });
    } finally {
      await loading.dismiss();
    }
  }
}