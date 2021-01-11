import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthStatusPage } from './auth-status';

@NgModule({
  declarations: [
    AuthStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthStatusPage),
  ],
})
export class AuthStatusPageModule {}
