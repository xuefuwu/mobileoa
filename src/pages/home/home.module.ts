import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomePage } from "./home";

//import {SelectPicturePageModule} from "../../shared/select-picture/select-picture.module";
@NgModule({
  imports: [
    IonicModule
    //SelectPicturePageModule
  ],
  declarations: [
    HomePage
  ],
  entryComponents: [
    HomePage
  ],
  providers: [

  ]
})
export class HomeModule {
}