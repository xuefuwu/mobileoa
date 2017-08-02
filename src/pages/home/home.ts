import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, Nav, Events } from 'ionic-angular';
import { MenuKhdj } from '../khdj/MenuKHDJ';
import { MenuAqjc } from "../aqjc/MenuAQJC";
import { MenuSrzt } from "../srzt/MenuSRZT";
import { AppConfig } from "../../app/app.config";
import { Owner } from "../login/user";
import { StorageService } from '../../providers/StorageService';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menukhdj: any;
  menuaqjc: any;
  menusrzt: any;
  user: Owner;
  UcHeader: string = "unLogin";
  @ViewChild('userinfo') container: ElementRef;
  constructor(public navCtrl: NavController, public appConfig: AppConfig, private storageService: StorageService, public events: Events) {
    // used for an example of ngFor and navigation
    this.menukhdj = { title: "消防检查", component: MenuKhdj };
    this.menuaqjc = { title: "建筑检查", component: MenuAqjc };
    this.menusrzt = { title: "三人驻堂", component: MenuSrzt };

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
    this.navCtrl.push(page.component);
  }

}
