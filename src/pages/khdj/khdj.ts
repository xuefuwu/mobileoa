import { ModalController, Platform, NavParams, NavController, ViewController } from 'ionic-angular';
import { Component, ComponentFactoryResolver, ViewChildren, ViewContainerRef, QueryList } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { KHDJService } from "./khdjService";
import _ from 'underscore/underscore';
import { KHDJ } from "../../modules/khdj";
import { FileUpdater } from "../../providers/FileUpdater";
import { UploadImg } from "../../components/uploadimg.component";
@Component({
    selector: 'khdj-Modal',
    templateUrl: 'khdj.html'
})
export class KHDJModal {
    csid: string;
    khjd: string;
    items: any = [];
    jcjg: any = [];
    khdj: KHDJ = new KHDJ();
    showupload: any;
    //private domain: string = "http://oa.wzmzzj.gov.cn/weboa";
    @ViewChildren('domImgs', { read: ViewContainerRef }) domImgs: QueryList<ViewContainerRef>;
    constructor(
        public platform: Platform,
        public params: NavParams,
        public navCtrl: NavController,
        public viewController: ViewController,
        public khdjService: KHDJService,
        private vcr: ViewContainerRef,
        private cfr: ComponentFactoryResolver
    ) {

        this.csid = this.params.get("csid");
        this.khjd = this.params.get("khjd");
        this.initKHX(this.khjd, this.csid);
    }

    addComponent(item:any) {
        let com = this.cfr.resolveComponentFactory(UploadImg);
        this.domImgs.forEach(e => {
            if (e.element.nativeElement.className=="domImg" + item.id) {
                let component = e.createComponent(com);
                if(item.imgs!=null){
                    component.instance.imgsList = true;
                    component.instance.Imgs = item.imgs;
                }
                component.instance.Item = item;
            }
        })
    }
    removeComponent(item: any) {
        this.domImgs.forEach(e => {
            if (e.element.nativeElement.className == "domImg" + item.id) {
                let component = e.clear();
            }
        })
    }

    initKHX(khjd: string, csid: string) {
        this.khdjService.getkhtz(khjd, csid).subscribe(res => {
            var jcnr = _.sortBy(_.filter(res, function (item) { return item.nrx != null }), function (item) { return parseInt(item.nrpx); });
            _.each(jcnr, function (item, key) {
                this.items.push({
                    khid:csid,
                    id: item.nrpx,
                    key: "KHX" + item.nrpx,
                    text: item.nrx,
                    value: item.khx,
                    imgs: item.imgs
                });
            }, this);

        });
    }
    dismiss() {
        this.viewController.dismiss();
    }
    submit() {
        this.viewController.dismiss();
    }
    upload(fileid: string) {
        this.navCtrl.push(FileUpdater, { "fileid": "khximg" + fileid });
    }
    optionchange(ev, key) {
        if (ev == "不合格") {
            this.addComponent(key);
        } else if (ev == "合格") {
            this.removeComponent(key);
        }
    }

}