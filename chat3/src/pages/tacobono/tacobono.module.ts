import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TacobonoPage } from './tacobono';

@NgModule({
  declarations: [
    TacobonoPage,
  ],
  imports: [
    IonicPageModule.forChild(TacobonoPage),
  ],
})
export class TacobonoPageModule {}
