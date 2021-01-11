import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import  firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { SalaPage } from '../sala/sala';
import { LigaProvider } from '../../providers/liga/liga';




/**
 * Generated class for the LigasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ligas',
  templateUrl: 'ligas.html',
})
export class LigasPage {
nombre:string='';
email:string='';
ligas:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public s:Storage,
     public provider:LigaProvider) {
     this.getLigas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LigasPage');
  }

  
crearLiga(){

  const prompt = this.alertCtrl.create({
    title: 'Crea Una Sala!',
    message: "Crea una Liga",
    inputs: [
      {
        name: 'Liga',
        placeholder: 'liga'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Entrar',
        handler: data => {
          console.log('Saved clicked:',data);

          this.provider.comprobarYcrearLiga(data.Liga);
         //this.existeLiga(data.Liga);




        }
      }
    ]
  });
  prompt.present();



  
}


abrirChat(liga:string){
  
  this.navCtrl.push(SalaPage,{liga:liga});
}

regresar(){
  this.navCtrl.pop(); 
 }
 

getLigas(){

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      

      var LigasRef = firebase.database().ref().child("usuarios").child(btoa(user.email)).child('ligas');
  LigasRef.on("value", (snap) => {
    //var data = snap.val();
    var data = snap.val();
    this.ligas = [];
    for(var key in data){
    
     

     

      this.ligas.push(data[key]);
      //this.content.scrollToBottom();
    
   
    } 
    });

    }
   });

  
  
}


  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Añadir Nueva Liga/Sala',
      message: "Ingresar Liga",
      inputs: [
        {
          name: 'Liga',
          placeholder: 'liga'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Entrar',
          handler: data => {
            console.log('Saved clicked:',data);
            this.provider.comprobarYunirse(data.Liga);
          }
        }
      ]
    });
    prompt.present();
  }




 obtenerNombre(){
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      
      this.nombre=user.displayName;
      this.email=user.email;

    }
   });
 }









 


}


