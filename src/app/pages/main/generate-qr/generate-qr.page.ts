import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { initializeApp } from 'firebase/app';


@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQrPage implements OnInit {
    form = new FormGroup({
    id: new FormControl('',),
    Nombre: new FormControl('', [Validators.required]),
    seccion: new FormControl('', [Validators.required]),
    
    })
    texto:any;

  constructor(private afs: AngularFirestore) { 
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

  async guardarQRFirebase(textoQR: string) {
    try {
      await this.afs.collection('codigos_qr').add({ contenido: textoQR });
      console.log('Código QR guardado en Firebase con éxito.');
    } catch (error) {
      console.error('Error al guardar el código QR en Firebase:', error);
    }
  }
}
