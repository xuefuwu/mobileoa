import { Component, ViewChild } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import {NavController, Nav} from 'ionic-angular';
import { AppConfig } from "./app.config";
import { Owner } from "../pages/login/user";

import { StorageService } from '../providers/StorageService';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{ title: string, component: any }>;
  user: Owner;
  UcHeader: string = "unLogin";
  constructor(platform: Platform, public appConfig: AppConfig, public menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen, private storageService: StorageService, public events: Events) {
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
  ionViewDidLoad() {
    this.user = this.storageService.read<Owner>('user');
    if (this.user != null) {        //判断
      this.UcHeader = "isLogined";        //改变值，即改变默认选项卡
    } else {
      this.events.subscribe('isLogined', () => {        //登录页面那里有一个事件发布，这里来订阅，然后改变值
        this.UcHeader = "isLogined";
      });
    }
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
