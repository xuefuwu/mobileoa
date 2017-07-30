import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuSrzt } from "./MenuSRZT";

//import {SelectPicturePageModule} from "../../shared/select-picture/select-picture.module";
@NgModule({
  imports: [
    IonicModule
    //SelectPicturePageModule
  ],
  declarations: [
    MenuSrzt
  ],
  entryComponents: [
    MenuSrzt
  ],
  providers: [

  ]
})
export class SRZTModule {
}