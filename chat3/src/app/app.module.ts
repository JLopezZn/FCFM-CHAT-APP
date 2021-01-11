import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule} from '@angular/common/http'
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import {ChatPage} from '../pages/chat/chat'
import { IonicStorageModule } from '@ionic/storage'//---------------------------------
import { RegistrarPage } from '../pages/registrar/registrar';
import { Push } from '@ionic-native/push';//-------------------------
import {Firebase} from '@ionic-native/firebase';//---------------------
import {Camera} from '@ionic-native/camera';//----------------------------------
import { File } from '@ionic-native/file';//-------------------------------------
import { AuthStatusPage } from '../pages/auth-status/auth-status';
import { InAppBrowser } from '@ionic-native/in-app-browser';//------------------
import { TacobonoPage } from '../pages/tacobono/tacobono';
import { EmojiProvider } from '../providers/emoji/emoji';
import { LigasPage } from '../pages/ligas/ligas';
import { SalaPage } from '../pages/sala/sala';
import { LigaProvider } from '../providers/liga/liga';
import { SalaProvider } from '../providers/sala/sala';
import { UserProvider } from '../providers/user/user';
import { ChatGrupalProvider } from '../providers/chat-grupal/chat-grupal';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
   ChatPage,
   RegistrarPage,
   AuthStatusPage,
   TacobonoPage,
   LigasPage,
   SalaPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ChatPage,
    RegistrarPage,
    AuthStatusPage,
    TacobonoPage,
    LigasPage,
    SalaPage

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    Firebase,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    EmojiProvider,
    LigaProvider,
    SalaProvider,
    UserProvider,
    ChatGrupalProvider
 
   
  ]
})
export class AppModule {}
