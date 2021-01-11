import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Camera ,CameraOptions} from '@ionic-native/camera';
import { UserProvider } from '../user/user';

/*
  Generated class for the ChatGrupalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatGrupalProvider {

  constructor(private camera: Camera,public user:UserProvider) {
  }

   
  sendMessage(message:any){
      var fecha=new Date();
      var f:string=fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear();
      var hora:string=fecha.getHours()+":"+fecha.getMinutes();
   
  
      var messagesRef = firebase.database().ref().child("mensajes");
      if(message !=null){
      messagesRef.push({tipo:'texto',mensaje: btoa(message),nombre: btoa(this.user.nombre),fecha:btoa(f),hora:btoa(hora),foto:this.user.pp,url:'dontcare'});    
     }
     
    
   
 }

camara(){
  const options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true,
    targetHeight:500,
    targetWidth:800
  }
  

  this.camera.getPicture(options).then((imageData) => { 
  let foto = 'data:image/jpeg;base64,'+imageData;
  //------------------------ 
  const Picture=firebase.storage().ref('chat/familia/'+this.makeid(12));
  Picture.putString(foto,'data_url').then(()=>{
  

    var fecha=new Date();
    var f:string=fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear();
    var hora:string=fecha.getHours()+":"+fecha.getMinutes();
    var messagesRef = firebase.database().ref().child("mensajes");
    Picture.getDownloadURL().then(picture=>{
      messagesRef.push({tipo:'foto', 
      nombre: btoa(this.user.nombre),fecha:btoa(f),hora:btoa(hora),foto:this.user.pp,url:picture,mensaje:btoa('ignorar')});
      
    });
   


  
  }).catch(e=>{console.log(e);});

  //---------------------
   }, () => {
    //this.tomoFoto=false;
   });
}

subirGaleria(){
  const options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true,
    targetHeight:500,
    targetWidth:800,
    sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM

  }
  

  this.camera.getPicture(options).then((imageData) => { 
  let foto = 'data:image/jpeg;base64,'+imageData;
  const Picture=firebase.storage().ref('chat/familia/'+this.makeid(12));
  
  Picture.putString(foto,'data_url').then(()=>{
  
  
  
  
  Picture.getDownloadURL().then(e=>{
    let u=JSON.stringify(e);
    let url=u.slice(1,-1);
    var fecha=new Date();
    var f:string=fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear();
    var hora:string=fecha.getHours()+":"+fecha.getMinutes();
    var messagesRef = firebase.database().ref().child("mensajes");

    messagesRef.push({tipo:'foto', 
    nombre: btoa(this.user.nombre),fecha:btoa(f),hora:btoa(hora),foto:this.user.pp,url:url,mensaje:btoa('ignorar')});
  });
  }).catch(e=>{console.log(e);});
   }, () => {
   });


 }






makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
}
