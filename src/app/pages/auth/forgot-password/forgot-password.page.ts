import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoadingController } from "@ionic/angular";
import { FirebaseService } from "src/app/services/firebase.service"; // Import your Firebase service here
import { UtilsService } from "src/app/services/utils.service";
import { Router } from "@angular/router";
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
      });

  constructor(
    private loadingController: LoadingController,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private router: Router
  ) { }
goToAuthenticationPage() {
    this.router.navigate(['/auth']); // Cambia '/auth' a la ruta de tu página de autenticación
  }
  async submit() {
    if (this.form.valid) {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      try {
        const email = this.form.value.email;
        await this.firebaseSvc.sendRecoveryEmail(email); // Call the method in your Firebase service to send the reset email
        this.utilsSvc.presentToast({
          message: 'Un correo de restablecimiento de contraseña ha sido enviado.',
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
