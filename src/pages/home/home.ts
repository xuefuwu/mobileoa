import { Component, ViewChild } from '@angular/core';

import { NavController, Nav } from 'ionic-angular';
import { MenuKhdj } from '../khdj/MenuKHDJ';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menukhdj:any;
  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
this.menukhdj={title:"消防检查",component:MenuKhdj};
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }

}
