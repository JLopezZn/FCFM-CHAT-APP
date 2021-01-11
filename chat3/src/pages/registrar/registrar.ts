import { Component } from '@angular/core';
import { user } from '../../modelo/usuario';
import { IonicPage, NavController, ModalController, ViewController, ToastController } from 'ionic-angular';
import  firebase from 'firebase';
import { ChatPage } from '../chat/chat';
import { Storage } from '@ionic/storage';
import {Camera,CameraOptions} from '@ionic-native/camera';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  auth=firebase.auth();

  foto:string=null;
  Ruser:user=new user();
  Rtoken:string='';
  tomoFoto:boolean=false;
  constructor(public navCtrl: NavController,public modalController: ModalController,
    private s:Storage,public viewCtrl:ViewController,public toastController: ToastController,
    private camera: Camera,public provider:UserProvider)
 {
      this.Ruser.nombre=null;
      this.Ruser.password=null;
      this.Ruser.nombre=null;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }




 tomarFoto(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true,
    targetHeight:200,
    targetWidth:200
  }

  const nombre=this.Ruser.nombre;
  

  this.camera.getPicture(options).then((imageData) => { 
  this.tomoFoto=true;  
  this.foto = 'data:image/jpeg;base64,'+imageData;
  
   }, (err) => {
    this.tomoFoto=false;
   });
 }
 
  
 Galeria(){
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

  const nombre=this.Ruser.nombre;
  

  this.camera.getPicture(options).then((imageData) => { 
  this.tomoFoto=true;  
  this.foto = 'data:image/jpeg;base64,'+imageData;
  
   }, (err) => {
    this.tomoFoto=false;
   });
 }
 
  




  registrar(){
    
 if(this.Ruser.nombre !=null&&this.Ruser.password!=null&&this.Ruser.email!=null&&this.Ruser.nombre.length>0){

 
 this.presentToast(); 
 this.auth.createUserWithEmailAndPassword(this.Ruser.email,this.Ruser.password).then(e=>{
   //validaciones




   firebase.auth().signInWithEmailAndPassword(this.Ruser.email,this.Ruser.password).then(e=>{
     this.provider.obtenerdatos();
    var userRef = firebase.database().ref().child('usuarios').child(btoa(this.Ruser.email.toLowerCase()));
    var user=firebase.auth().currentUser;
    //subir nombre
    user.updateProfile({
      displayName:this.Ruser.nombre
      });
    //crear nodo
    userRef.set({nombre: btoa(this.Ruser.nombre),email: btoa(user.email),token:this.provider.token,uid:this.provider.uid});
    //subir foto----------------
    const profilePicture=firebase.storage().ref('ProfilePicture/'+this.Ruser.email.toLowerCase()+'/pp');
    if(this.foto!=null){
    profilePicture.putString(this.foto,'data_url').then(e=>{
      this.navCtrl.setRoot(ChatPage);

     }).catch(e=>{
       console.log(e);
       this.navCtrl.setRoot(ChatPage);
    });
}







   }).catch(error=>{this.ErrorToast(error);});





 }).catch(error=>{this.ErrorToast(error);});
 


 //_-----------------------------------------------------------------------------------

 


//logearse
firebase.auth().signInWithEmailAndPassword(this.Ruser.email,this.Ruser.password);

//Nombre------------------------------------
firebase.auth().onAuthStateChanged((user)=>{
  if(user){
   user.updateProfile({
   displayName:this.Ruser.nombre
   });
   console.log(user.displayName);
  }
 });
//------------------------------------------

//cookies--------------------------------
this.s.set('nombre',this.Ruser.nombre);
this.s.set('email',this.Ruser.email);
//---------------------------------------

//subir foto-------------------------------------------------------------------------


//-----------------------------------------------------------------------------------


//pasar al chat--------------------------

setTimeout(() => {
  this.navCtrl.setRoot(ChatPage);

 }, 2000);
//_--------------------------------------
} 


else this.ErrorToast('error!');
}
   
    












    closeModal(){
 this.viewCtrl.dismiss();
    }
    
    
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Registrado Correctamente!',
        duration: 1200
      });
      toast.present();
    }

    async ErrorToast(error) {
      const toast = await this.toastController.create({
        message: error,
        duration: 2000
      });
      toast.present();
    }
   
  
 
   
       

   
}
