import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateQrPageRoutingModule } from './generate-qr-routing.module';

import { GenerateQrPage } from './generate-qr.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [QRCodeModule, CommonModule, FormsModule, IonicModule, GenerateQrPageRoutingModule],
  declarations: [GenerateQrPage]
})

export class GenerateQrPageModule {}
