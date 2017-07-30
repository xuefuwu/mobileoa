import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuAqjc } from "./MenuAQJC";
import { Index_pc } from "./indexpc";
import { Index_dc } from "./indexdc";
import { Index_cc } from "./indexcc";

//import {SelectPicturePageModule} from "../../shared/select-picture/select-picture.module";
@NgModule({
  imports: [
    IonicModule
    //SelectPicturePageModule
  ],
  declarations: [
    MenuAqjc,
    Index_pc,
    Index_cc,
    Index_dc
  ],
  entryComponents: [
    MenuAqjc,
    Index_pc,
    Index_cc,
    Index_dc
  ],
  providers: [

  ]
})
export class AQJCModule {
}