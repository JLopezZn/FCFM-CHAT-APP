import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {Firebase} from '@ionic-native/firebase'
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';


import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ChatPage } from '../pages/chat/chat';
import { AuthStatusPage } from '../pages/auth-status/auth-status';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TacobonoPage } from '../pages/tacobono/tacobono';


var config = {
  apiKey: "AIzaSyDpTfH9W587bU3wiDAPYV1Hz4Kcdn7lrFI",
  authDomain: "lcc-chat.firebaseapp.com",
  databaseURL: "https://lcc-chat.firebaseio.com",
  projectId: "lcc-chat",
  storageBucket: "lcc-chat.appspot.com",
  messagingSenderId: "775672341242"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage:any = AuthStatusPage;
  
  pages: Array<{title: string, component: any,nombre:string}>;

  constructor(
    platform: Platform, 
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private push: Push,
    private fcm:Firebase,private s:Storage,
    private iab: InAppBrowser
    
    )
    
     {
   
    this.pages=[
      {title:'FCFM👨‍🎓',component:ChatPage,nombre:'fcfm'},
      {title:'UANL-APP👨‍🎓',component:ChatPage,nombre:'uanl'},
      {title:'Tacobono 🌮',component:TacobonoPage,nombre:'tacobono'}
 
      ];
   
    platform.ready().then(() => {
      // Okay, so the platforsm is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushSetup();
     
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
         this.rootPage=ChatPage; 
        }else{
         this.rootPage=LoginPage; 
 
        }
       });

      

  

      //obtener token --------------------------------------  
      this.fcm.getToken()
      .then(token =>{ 

      s.get('token').then(tokenLocal=>{
     //si existe el token
      //  alert(tokenLocal);
       // alert(token);
       if(token.localeCompare(tokenLocal)===0){
      // alert('token es el mismo :'+token);

       }else{
        s.remove('token').then(e=>{
          s.set('token',token).then(e=>{
            firebase.database().ref().child('tokens').push({token:token});
          //  alert('se guardo token');

        })
        

   
      })
        .catch(e=>console.log(e));
}

      }).catch(error=>{ 
       s.set('token',token).then(e=>{
        firebase.database().ref().child('tokens').push({token:token}) ;
       }).catch(error=>console.log(error));

      });


      //firebase.database().ref().child('tokens').push({token:token}) ;

    })
    //catch obtener token de firebase 
    .catch(error => alert( error) );

    //---------------------------

      
      
      this.fcm.onTokenRefresh()
  .subscribe((token: string) =>{
  // this.s.remove('token');
   //this.s.set('token',token); 


  });

    });

   
    firebase.initializeApp(config);


  }

  pushSetup(){
    const options: PushOptions = {
       android: {
           // Añadimos el sender ID para Android.
           senderID: '775672341242'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       }
    };
 
    const pushObject: PushObject = this.push.init(options);

    
 
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  menuFuncion(page) {
   if(page.nombre.localeCompare('fcfm')===0){
    const browser = this.iab.create('http://www.fcfm.uanl.mx/');

   }
   
   if(page.nombre.localeCompare('uanl')===0){
    const browser = this.iab.create('android-app://com.uanl.appuanl',"_system");

   }

   if(page.nombre.localeCompare('tacobono')===0){
    
    //this.nav.setRoot(page.component);
    this.rootPage=page.component;
   }

  }

}

