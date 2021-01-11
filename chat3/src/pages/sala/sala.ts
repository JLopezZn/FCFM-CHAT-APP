import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController, ActionSheetController } from 'ionic-angular';
import  firebase from 'firebase';
import { LoginPage } from '../login/login';

import { InAppBrowser } from '@ionic-native/in-app-browser';


import { MenuController } from 'ionic-angular';
import { LigasPage } from '../ligas/ligas';
import { SalaProvider } from '../../providers/sala/sala';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the SalaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sala',
  templateUrl: 'sala.html',
})
export class SalaPage {

  @ViewChild(Content) content:Content;
  messages:string[]=[];
  message:string;
  cad:any;
  id:string;
  ind=0;
  
  liga:string='';
 
  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public alertCtrl: AlertController,
  public actionSheetCtrl: ActionSheetController,
  private iab: InAppBrowser,
  private menu: MenuController,
  public sala:SalaProvider,
  private user:UserProvider) {
    menu.enable(true);
  
  //obtener liga
  this.liga=this.navParams.get('liga');



//scroll
 setTimeout(() => {
 this.bajar()
}, 2200);


  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.getMessages();
    this.bajar();
  }






 



ligas(){
 this.navCtrl.push(LigasPage); 
}


regresar(){
 this.navCtrl.pop(); 
}


 fcfm(){
    const browser = this.iab.create('http://www.fcfm.uanl.mx/');



  }

uanl(){
 const browser = this.iab.create('android-app://com.uanl.appuanl',"_system");
}
  

  ajustes() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Ajustes',
      buttons: [
      {
          text: 'Cambiar Foto de Perfil',
          handler: () => {
            this.CambiarFotoPerfil();
          }
        }
        ,{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



 openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }




  getMessages(){
    var messagesRef = firebase.database().ref().child("salas").child(this.liga).child('mensajes');
    messagesRef.on("value", (snap) => {
      //var data = snap.val();
      var data = snap.val();
      this.messages = [];
      for(var key in data){
        if(data[key].mensaje!=null){
         var d:string=data[key].mensaje;
         data[key].mensaje=atob(d);
        }

         var n:string=data[key].nombre;
         data[key].nombre=atob(n);
         
         var f:string=data[key].fecha;
         data[key].fecha=atob(f);
         var h:string=data[key].hora;
         data[key].hora=atob(h);


       

        this.messages.push(data[key]);
        this.content.scrollToBottom();
      
     
      } 
      });
  }


  salir(){
    this.user.logout();
    this.navCtrl.setRoot(LoginPage);

    }



  bajar(){
  this.content.scrollToBottom();
  }

  enviarMensaje(){
  this.sala.sendMessage(this.message,this.liga);
  this.content.scrollToBottom(1000);
  this.message = null;
  }

  subirCamara(){
  
  this.sala.camara(this.liga);
  this.content.scrollToBottom();
  this.bajar();
  }

  isUrl(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
  }





subirGaleria(){
  this.sala.subirGaleria(this.liga);
  this.content.scrollToBottom();


 }






CambiarFotoPerfil(){
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Ajustes',
    buttons: [
    {
        text: 'Camara',
        handler: () => {
          this.CambiarFotoPerfilCamara();
        }
      },
      {
        text: 'Galeria',
        handler: () => {
          this.CambiarFotoPerfilGaleria();

        }
      }
      ,{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();

}



CambiarFotoPerfilCamara(){
  this.user.cambiarfotoPerfilcamara();



  
}


CambiarFotoPerfilGaleria(){
 this.user.CambiarFotoPerfilGaleria();
}






}
