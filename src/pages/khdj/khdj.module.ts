import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuKhdj } from "./MenuKHDJ";
import { Index_pc } from "./indexpc";
import { Index_dc } from "./indexdc";
import { Index_cc } from "./indexcc";
import { CSList } from "./cslist";
import { KHDJService } from "./khdjService";

//import {SelectPicturePageModule} from "../../shared/select-picture/select-picture.module";
@NgModule({
  imports: [
    IonicModule
    //SelectPicturePageModule
  ],
  declarations: [
    MenuKhdj,
    Index_pc,
    Index_cc,
    Index_dc,
    CSList
  ],
  entryComponents: [
    MenuKhdj,
    Index_pc,
    Index_cc,
    Index_dc,
    CSList
  ],
  providers: [
    KHDJService
  ]
})
export class KHDJModule {
}