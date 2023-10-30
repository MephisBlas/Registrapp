import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateQrPage } from './generate-qr.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateQrPageRoutingModule {}
