import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../user/user';


/*
  Generated class for the LigaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ligaGlobal:string;


function unirse(liga:any,token:any){
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      
      var LigaRef = firebase.database().ref().child("usuarios").child(btoa(user.email)).child('ligas').child(liga);
      LigaRef.set({nombre:liga});

      var SalasRef=firebase.database().ref().child('salas').child(liga).child('usuarios').child(btoa(user.email));
      SalasRef.set({nombre:btoa(user.displayName),email:btoa(user.email)});
      
        var TokensRef=firebase.database().ref().child('salas').child(liga).child('tokens').child(btoa(user.email));
        TokensRef.set({token:token});
        
     
     

    }
   });
}

var token:string;
@Injectable()
export class LigaProvider {
  constructor(public s:Storage,public user:UserProvider) {
    console.log('Hello LigaProvider Provider');
    token=this.user.token;
  }


  


comprobarYcrearLiga(liga:any){
  ligaGlobal=liga;
  var LigaRef=firebase.database().ref().child('salas');
  LigaRef.once('value', function(snapshot) {
    if (snapshot.hasChild(liga)) {
    
    alert('Ya existe esa Liga!');
    }else{
      var fecha=new Date();
      var f:string=fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear();
      var hora:string=fecha.getHours()+":"+fecha.getMinutes();
      var user = firebase.auth().currentUser;

      var LigaRef=firebase.database().ref().child('salas').child(liga);

      LigaRef.set({nombre:ligaGlobal,fecha_De_Creacion:f+' ~~{'+hora+'}~~',Creada_Por_Uid:user.uid}).then(e=>{
      unirse(ligaGlobal,token);
    

     }).then(e=>{
       //alert(e);
      });
      
    }
  });
}

comprobarYunirse(liga:any){
  ligaGlobal=liga;
  var LigaRef=firebase.database().ref().child('salas');
  LigaRef.once('value', function(snapshot) {
    if (snapshot.hasChild(liga)) {
    unirse(ligaGlobal,token);
    }else{
      alert('No existe esa liga!');

      
    }
  });

}


}
