import { Component, Input, ViewChild, ElementRef, ComponentFactoryResolver, ViewChildren, ViewContainerRef, QueryList } from "@angular/core";
import { ActionSheetController } from 'ionic-angular';
import { StorageService } from '../providers/StorageService';
import { Owner } from "../pages/login/user";
import { HttpServiceProvider } from "../providers/http-service";
import { FileInput } from "./files.component";
import _ from 'underscore/underscore';
import { KHDJService } from "../pages/khdj/khdjService";

@Component({
    selector: 'uploadimg-Modal',
    templateUrl: 'uploadimg.html',
})
export class UploadImg {
    private user: Owner;
    private _item: any;
    private imgs: any[];
    private _fileInputs:any=[];
    private imgsExist: boolean = false;
    private _imgsList: any;
    @ViewChildren('uploadimg') uploadimg: QueryList<ElementRef>;
    @ViewChildren('fileInputs', { read: ViewContainerRef }) fileInputs: QueryList<ViewContainerRef>;
    constructor(
        private storageService: StorageService,
        private httpService: HttpServiceProvider,
        private khdjService: KHDJService,
        private vcr: ViewContainerRef,
        private cfr: ComponentFactoryResolver,
        public actionSheetCtrl: ActionSheetController
    ) {
        this.user = this.storageService.read<Owner>('user');
    }
    presentActionSheet(img:any) {
        let actionSheet = this.actionSheetCtrl.create({
          //title: 'Modify your album',
          buttons: [
            {
              text: '删除',
              role: 'delete',
              handler: () => {
                this.removeComponent(img);
                console.log('delete clicked');
              }
            }
          ]
        });
        actionSheet.present();
      }
    upload() {
        var input = new FormData();
        this._fileInputs.forEach(e=>{
            input.append(this._item.imgkey, e.instance.File);
        });
        input.append("action", "upload");
        input.append("filepath", '/attachment');
        input.append("moduleid", "khdj");
        input.append("docid", this._item.khid);
        input.append("userid", this.user.ID);
        this.httpService.post1("/api/upload.jsp", input).subscribe(res => {
            this.imgs = [];
            _.each(res.json(),function(item,index){
                this.imgs.push(item);
            },this);
        });

    }
    addComponent(item: any) {
        let com = this.cfr.resolveComponentFactory(FileInput);
        this.fileInputs.forEach(e=>{
            let component = e.createComponent(com);
            this._fileInputs.push(component);
        });
    }
    removeComponent(item: any) {
        let node=item.target;
        this.khdjService.removeImgs(node.id).subscribe(res =>{
            this.imgs.splice(this.imgs.findIndex(e=>{return node.id==e.ATTACHMENTID}),1);
        });
        
    }
    fileChanged() {
        this.addComponent(null);
    }
    @Input('imgsList')
    set imgsList(value: boolean) {
        this._imgsList = value;
    }

    get imgsList() {
        return this._imgsList;
    }

    @Input("imgs")
    set Imgs(value: any) {
        this.imgs = value;
    }
    get Imgs() {
        return this.imgs;
    }
    @Input("item")
    set Item(value: any) {
        this._item = value;
    }
    get Item() {
        return this._item;
    }


}