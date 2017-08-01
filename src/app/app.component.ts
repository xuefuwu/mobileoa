import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import {NavController, Nav} from 'ionic-angular';
import { AppConfig } from "./app.config";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform,public appConfig:AppConfig, public menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    /*
    this.pages = [
      { title: 'Page Home', component: HomePage },
      { title: 'Page About', component: AboutPage },
      { title: 'Page Contact', component: ContactPage },
      { title: 'Page Test', component: TestPage },
    ];
    */
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  logout(){
    this.menu.close();
    this.nav.setRoot(LoginPage);
  }
}
