import { ModalController, Platform, NavParams, NavController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { KHDJService } from "./khdjService";
import _ from 'underscore/underscore';
import { KHDJ } from "../../modules/khdj";
import { FileUpdater } from "../../providers/FileUpdater";
@Component({
    selector: 'khdj-Modal',
    templateUrl: 'khdj.html'
})
export class KHDJModal {
    csid: string;
    khjd: string;
    items: any = [];
    jcjg: any = [];
    khdj:KHDJ = new KHDJ();
    private domain:string = "http://oa.wzmzzj.gov.cn/weboa";
    constructor(
        public platform: Platform,
        public params: NavParams,
        public navCtrl: NavController,
        public viewController: ViewController,
        public khdjService: KHDJService
    ) {

        this.csid = this.params.get("csid");
        this.khjd = this.params.get("khjd");
        this.initKHX(this.khjd, this.csid);
    }

    initKHX(khjd: string, csid: string) {
        console.log(this.jcjg);
        this.khdjService.getkhtz(khjd,csid).subscribe(res => {
            var jcnr = _.sortBy(_.filter(res,function(item){return item.nrx!=null}), function (item) { return parseInt(item.nrpx); });
            _.each(jcnr, function (item, key) {
                this.items.push({
                    id: item.nrpx,
                    key: "KHX" + item.nrpx,
                    text: item.nrx,
                    value: item.khx,
                    imgs:item.imgs
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
        this.navCtrl.push(FileUpdater,{"fileid":"khximg"+fileid});
    }
}