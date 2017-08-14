import { Component, Input } from "@angular/core";
@Component({
    selector: 'uploadimg-Modal',
    templateUrl: 'uploadimg.html',
})
export class UploadImg {
    private imgs: any[];
    private id: string;
    private imgsExist: boolean = false;
    private domain: string = "http://oa.wzmzzj.gov.cn/weboa";
    private _imgsList:any;
    constructor() {
        console.log(this._imgsList);
    }
    upload() {

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
}