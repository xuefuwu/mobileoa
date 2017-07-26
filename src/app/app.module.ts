import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpServiceProvider } from '../providers/http-service';
import {HttpInterceptHandle} from "../providers/HttpInterceptHandle";
import {NativeService} from "../providers/NativeService";
import { StorageService } from '../providers/StorageService';
import {GlobalData} from "../providers/GlobalData";
import {TestModule} from "../pages/test/test.module";
import { LoginModule } from '../pages/login/login.module';
import { HomeModule } from '../pages/home/home.module';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    HomeModule,
    LoginModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    HttpInterceptHandle,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeService,
    StorageService,
    HttpServiceProvider,
    GlobalData
  ]
})
export class AppModule {}
