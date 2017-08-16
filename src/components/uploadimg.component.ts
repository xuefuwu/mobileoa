import { Component, Input, ViewChild, ElementRef, ComponentFactoryResolver, ViewChildren, ViewContainerRef, QueryList } from "@angular/core";
import { StorageService } from '../providers/StorageService';
import { Owner } from "../pages/login/user";
import { HttpServiceProvider } from "../providers/http-service";
import { FileInput } from "./files.component";
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
    //private domain: string = "http://oa.wzmzzj.gov.cn/weboa";
    private _imgsList: any;
    @ViewChildren('uploadimg') uploadimg: QueryList<ElementRef>;
    @ViewChildren('fileInputs', { read: ViewContainerRef }) fileInputs: QueryList<ViewContainerRef>;
    constructor(
        private storageService: StorageService,
        private httpService: HttpServiceProvider,
        private vcr: ViewContainerRef,
        private cfr: ComponentFactoryResolver
    ) {
        this.user = this.storageService.read<Owner>('user');
    }
    
    upload() {
        var input = new FormData();
        this._fileInputs.forEach(e=>{
            input.append("khximg" + this._item.id, e.instance.File);
        });
        input.append("action", "upload");
        input.append("filepath", '/attachment');
        input.append("moduleid", "khdj");
        input.append("docid", this._item.khid);
        input.append("userid", this.user.ID);
        this.httpService.post1("/api/upload.jsp", input).subscribe(res => {
            console.log(res);
        });

    }
    addComponent(item: any) {
        let com = this.cfr.resolveComponentFactory(FileInput);
        this.fileInputs.forEach(e=>{
            let component = e.createComponent(com);
            this._fileInputs.push(component);
        });
        //.createComponent(com);
        
    }
    removeComponent(item: any) {
        //this.fileInputs.clear();
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