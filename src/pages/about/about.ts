import { Component, ViewChild } from '@angular/core';

import { NavController, Nav } from 'ionic-angular';
import { HomePage } from "../home/home";
import { TabsPage } from '../tabs/tabs';
import { ContactPage } from '../contact/contact';
import { TestPage } from '../test/test';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page Home1', component: HomePage },
      { title: 'Page About1', component: AboutPage },
      { title: 'Page Contact1', component: ContactPage },
      { title: 'Page Test1', component: TestPage },
    ];
    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

}
