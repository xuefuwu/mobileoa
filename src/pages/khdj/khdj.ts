import { ModalController, Platform, NavParams, NavController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { KHDJService } from "./khdjService";
import _ from 'underscore/underscore';
import { KHDJ } from "../../modules/khdj";
@Component({
    selector: 'khdjModal',
    templateUrl: 'khdj.html'
})
export class KHDJModal {
    csid: string;
    khjd: string;
    items: any = [];
    jcjg: any = [];
    khdj:KHDJ;
    constructor(
        public platform: Platform,
        public params: NavParams,
        public navCtrl: NavController,
        public viewController: ViewController,
        public khdjService: KHDJService
    ) {

        this.csid = this.params.get("csid");
        this.khjd = this.params.get("khjd");
        this.initKHDJ(this.csid);
        this.initKHX(this.khjd, this.csid);
        console.log(this.khdj);
    }
    initKHDJ(csid: string) {
        this.khdjService.getkhdj(csid).subscribe(res => {
            
            _.each(_.pairs(res[0]), function (item, key) {
                this.khdj.khjg.push({
                    key: item[0],
                    value: item[1]
                });
            }, this);
        });
    }
    initKHX(khjd: string, csid: string) {
        console.log(this.jcjg);
        this.khdjService.getkhtz(khjd).subscribe(res => {

            var jcnr = _.filter(_.pairs(res[0]), function (item) {
                return item[0].toLowerCase().indexOf("nrx") > -1;
            });
            jcnr = _.sortBy(jcnr, function (item) { return parseInt(item[0].substring(3)); });
            _.each(jcnr, function (item, key) {
                this.items.push({
                    key: "KHX" + parseInt(item[0].substring(3)),
                    text: item[1],
                    value:function(){return "1";}
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