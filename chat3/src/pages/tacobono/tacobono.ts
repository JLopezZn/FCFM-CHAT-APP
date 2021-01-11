import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the TacobonoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tacobono',
  templateUrl: 'tacobono.html',
})
export class TacobonoPage {
  tacobonoLink:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TacobonoPage');
    this.obtenerTacobono();

  }

 obtenerTacobono(){

 firebase.storage().ref('Tacobono/taco.jpg').getDownloadURL().then(e=>{
  let link=JSON.stringify(e);
  this.tacobonoLink=link.slice(1,-1);
  console.log(this.tacobonoLink);
  }).catch(e=>{
  console.log(e); 
 });

 }

 regresar(){
   
   this.navCtrl.setRoot(ChatPage);
  
 }
}
