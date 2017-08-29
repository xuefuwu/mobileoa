import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuKhdj } from "./MenuKHDJ";
import { Index_pc } from "./pc/indexpc";
import { Index_dc } from "./dc/indexdc";
import { Index_cc } from "./cc/indexcc";
import { CSList } from "./pc/cslist";
import { KHDJModal } from "./pc/khdj";
import { KHDJService } from "./khdjService";
import { JCSJ } from "./jcsj";
import { FileUpdater } from "../../providers/FileUpdater";
import { UploadImg } from "../../components/uploadimg.component";
import { FileInput } from "../../components/files.component";

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
    CSList,
    KHDJModal,
    JCSJ,
    FileUpdater,
    UploadImg,
    FileInput
  ],
  entryComponents: [
    MenuKhdj,
    Index_pc,
    Index_cc,
    Index_dc,
    CSList,
    KHDJModal,
    JCSJ,
    FileUpdater,
    UploadImg,
    FileInput
  ],
  providers: [
    KHDJService,
  ]
})
export class KHDJModule {
}