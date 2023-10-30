import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingUpPageRoutingModule } from './sing-up-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SingUpPage } from './sing-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingUpPageRoutingModule,
    SharedModule
  ],
  declarations: [SingUpPage]
})
export class SingUpPageModule {}
