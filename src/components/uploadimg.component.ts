import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { StorageService } from '../providers/StorageService';
import { Owner } from "../pages/login/user";
import { HttpServiceProvider } from "../providers/http-service";
@Component({
    selector: 'uploadimg-Modal',
    templateUrl: 'uploadimg.html',
})
export class UploadImg {
    private user:Owner;
    private _item:any;
    private imgs: any[];
    private imgsExist: boolean = false;
    //private domain: string = "http://oa.wzmzzj.gov.cn/weboa";
    private _imgsList:any;
    @ViewChild('uploadimg') uploadimg: ElementRef;
    constructor(
        private storageService: StorageService,
        private httpService: HttpServiceProvider
    ) {
        this.user = this.storageService.read<Owner>('user');
    }
    
    upload() {
        let fi = this.uploadimg.nativeElement;
        //fi.name="khximg"+this._item.id;
        if (fi.files) {
            var input = new FormData();
            
            input.append("khximg"+this._item.id, fi.files[0]);
            input.append("action", "upload");
            input.append("filepath", '/attachment');
            input.append("moduleid", "khdj");
            input.append("docid", this._item.khid);
            input.append("userid",this.user.ID);
            this.httpService.post1("/api/upload.jsp", input).subscribe(res => {
                console.log(res);
            });
        }
    }
    fileChanged(event) {
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size > 512000) {
                console.log('the file size more than 500kb');
                //this.fileValid = false;
            } else {
                console.log('the file size less than 500kb');
                //this.fileValid = true;
            }
            let reader = new FileReader();
            //get the selected file from event
            let file = event.target.files[0];
            reader.onloadend = function (e) {
                //Assign the result to variable for setting the src of image element

                //var the_file = new Blob([e.target.result ], { type: "image/jpeg" } );
            }
            reader.readAsDataURL(file);
        }
    }
    @Input('imgsList')
    set imgsList(value: boolean) {
        this._imgsList = value;
    }

    get imgsList() {
        return this._imgsList;
    }

    @Input("imgs")
    set Imgs(value:any){
        this.imgs = value;
    }
    get Imgs(){
        return this.imgs;
    }
    @Input("item")
    set Item(value:any){
        this._item = value;
    }
    get Item(){
        return this._item;
    }

    
}