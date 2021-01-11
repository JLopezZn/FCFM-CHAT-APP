import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ChatPage } from '../chat/chat';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the AuthStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth-status',
  templateUrl: 'auth-status.html',
})
export class AuthStatusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private user:UserProvider) {
  
      firebase.auth().onAuthStateChanged((user)=>{
       if(user){
        this.user.obtenerdatos();

        this.navCtrl.setRoot(ChatPage); 
       }else{
        this.navCtrl.setRoot(LoginPage); 

       }
      });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthStatusPage');
  }

}
