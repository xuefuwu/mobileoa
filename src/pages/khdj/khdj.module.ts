import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuKhdj } from "./MenuKHDJ";
import { Index_pc } from "./indexpc";
import { Index_dc } from "./indexdc";
import { Index_cc } from "./indexcc";
import { CSList } from "./cslist";
import { KHDJModal } from "./khdj";
import { KHDJService } from "./khdjService";
import { JCSJ } from "./jcsj";
import { FileUpdater } from "../../providers/FileUpdater";
import { File, FileEntry } from "@ionic-native/file";
import { Camera } from '@ionic-native/camera';
import { UploadImg } from "../../components/uploadimg.component";

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
    UploadImg
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
    UploadImg
  ],
  providers: [
    KHDJService,
    File, Camera
  ]
})
export class KHDJModule {
}