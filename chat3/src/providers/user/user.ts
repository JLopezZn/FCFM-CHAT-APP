import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import {Camera,CameraOptions} from '@ionic-native/camera';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
   pp:string='';
   nombre:string;
   email:String;
   uid:String;
   token:string;
   
  constructor(private s:Storage,private camera: Camera) {
   this.obtenerdatos();
  }
   obtenerdatos(){
    var user=firebase.auth().currentUser;

    var p=firebase.storage().ref('ProfilePicture/'+user.email+'/pp').getDownloadURL();
    this.s.get('token').then(tok=>{
      p.then(e=>{
        this.nombre=user.displayName;
        this.email=user.email;
        this.uid=user.uid;
        this.pp=e;
        this.token=tok;
       }).catch(e=>{
        this.nombre=user.displayName;
        this.email=user.email;
        this.uid=user.uid;
        this.token=tok;
       });
        
    });
 

   }

   logout(){
    let auth=firebase.auth(); 
    auth.signOut().then(()=>{
      this.s.remove('usuario');
      this.s.remove('pp');
      this.s.remove('nombre');
      this.s.remove('correo');
      
    }).catch(error=>{
   alert(error);
    });
   }

   cambiarfotoPerfilcamara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      targetHeight:200,
      targetWidth:200
    }
  
    this.camera.getPicture(options).then((imageData) => { 
     
    let foto = 'data:image/jpeg;base64,'+imageData;
    this.uploadPP(foto);
  
     }, () => {
     
     });
  
   }

   CambiarFotoPerfilGaleria(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      targetHeight:200,
      targetWidth:200,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
  
    this.camera.getPicture(options).then((imageData) => { 
     
    let foto = 'data:image/jpeg;base64,'+imageData;
    this.uploadPP(foto);
  
     }, () => {
     
     });
  
  
  
    
  }

   uploadPP(foto:string){
    const profilePicture=firebase.storage().ref('ProfilePicture/'+this.email+'/pp');
    if(foto!=null){
    profilePicture.putString(foto,'data_url').then(()=>{
      
    profilePicture.getDownloadURL().then(e=>{
    this.s.remove('pp');
    this.s.set('pp',JSON.stringify(e));
    this.pp=e;
    });
  });
  
    }
  }



}
