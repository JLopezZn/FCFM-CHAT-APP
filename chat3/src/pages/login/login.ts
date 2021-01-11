import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ToastController } from 'ionic-angular';
import  firebase from 'firebase';
import { user } from '../../modelo/usuario';
import { ChatPage } from '../chat/chat';
import { Storage } from '@ionic/storage';
import { RegistrarPage } from '../registrar/registrar';
import * as anime from 'animejs'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

//Ruser:user=new user();
user:user=new user();
auth=firebase.auth();
usuarios:string[]=[];

callAnime(){
  
}

constructor(public navCtrl: NavController,private s:Storage,
public modalController: ModalController,public toastController: ToastController) {

}


ionViewDidLoad() {
console.log('ionViewDidLoad LoginPage');
}


  login(){
   
 this.auth.signInWithEmailAndPassword(this.user.email.toLowerCase(),this.user.password).then(e=>{

this.presentToast();
   

this.navCtrl.setRoot(ChatPage);
 }).catch(error=>{
  this.ErrorToast(error);
 });
 }

 async presentToast() {
  const toast = await this.toastController.create({
    message: 'Bienvenido '+this.user.nombre+'!',
    duration: 1200
  });
  toast.present();
}

async ErrorToast(s:string) {
  const toast = await this.toastController.create({
    message: s,
    duration: 2000
  });
  toast.present();
}


 

  


openModal(){
 let modal=this.modalController.create(RegistrarPage);
 modal.present(); 
}

AgregarCuenta(){
  this.navCtrl.push(RegistrarPage);
}














}

