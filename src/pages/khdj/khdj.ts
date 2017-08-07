import { ModalController, Platform, NavParams, NavController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { KHDJService } from "./khdjService";
import _ from 'underscore/underscore';
import { KHDJ } from "../../modules/khdj";
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
    public domain: string = "http://oa.wzmzzj.gov.cn/weboa";
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
                    key: "NRX" + item.nrpx,
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
    optionchange(ev: any, ind: string) {
        let val = ev.value;
        console.log("optionchange" + ind+";khx1:");
    }
    optionSelect(ev: any, ind: string) {
        let val = ev;
        console.log("optionSelect" + ind);
        this.jcjg[ind] = ev;
    }
    initSelectedValue(ev: any, ind: string) {
        let val = ev;
        console.log("updateSelectedValue" + ind);
    }
    isSelected(ev:any){
        console.log(ev);
    }
}