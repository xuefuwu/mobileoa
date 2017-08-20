import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { KHDJService } from "./khdjService";
import { HttpServiceProvider } from "../../providers/http-service";
import { NativeService } from "../../providers/NativeService";
import { csObject } from '../../modules/csgl'
import { KHDJModal } from "./khdj";
import _ from 'underscore/underscore';
@Component({
    selector: 'list_cs',
    templateUrl: 'cslist.html'
})
export class CSList {
    items = [];
    allItems: csObject[];
    ssqx: string;
    khjd: string;
    groups: any = [];
    constructor(
        public navCtrl: NavController,
        public khdjService: KHDJService,
        //private storageService: StorageService,
        private navParams: NavParams,
        public modalCtrl: ModalController
    ) {
        this.ssqx = this.navParams.get("ssqx");
        this.khjd = this.navParams.get("khjd");
        this.initData();
    }
    initData() {
        this.khdjService.getcsList(this.ssqx, this.khjd).subscribe((csobjs: csObject[]) => {
            this.allItems = csobjs;
            _.each(_.groupBy(csobjs, function (item) { return item.SSJD; }), function (item, key) {
                this.groups.push({
                    name: key,
                    items: item,
                    show: false
                });
            }, this);

        });
    }
    ionViewDidLoad() {

    }
    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        /*
                setTimeout(() => {
                    var length = this.allItems.length < 15 ? this.allItems.length : 15;
                    for (let i = 0; i < length; i++) {
                        this.items.push(this.allItems[i]);
                        console.log(length + "_" + i + "_" + this.allItems.length);
                    }
                    //this.allItems.splice(0, length);
                    
                }, 500);
                */
        console.log('Async operation has ended');
        infiniteScroll.complete();
    }

    /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
    toggleGroup(group) {
        group.show = !group.show;
    };
    isGroupShown(group) {
        return group.show;
    };
    getItems(ev: any) {
        // Reset items back to all of the items
        //this.initData();
        this.groups = [];

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {

            var allitem = _.groupBy(_.filter(this.allItems, function (item) {
                return item.CSMC.toLowerCase().indexOf(val.toLowerCase()) > -1;
            }), function (item) { return item.SSJD; })
            _.each(allitem, function (item, key) {
                //if (item.CSMC.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                this.groups.push({
                    name: key,
                    items: item,
                    show: false
                });
                //}
            }, this);
        } else {
            this.initData();
        }
    }
    viewcompleted(ev: any) {
        this.groups = [];
        let val = ev.value;
        var allitem = _.groupBy(_.filter(this.allItems, function (item) {
            return item.STATUS.toLowerCase().indexOf(val.toLowerCase()) > -1;
        }), function (item) { return item.SSJD; })
        _.each(allitem, function (item, key) {
            //if (item.CSMC.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            this.groups.push({
                name: key,
                items: item,
                show: false
            });
            //}
        }, this);
    }

    presentModal(item) {
        let modal = this.modalCtrl.create(KHDJModal,{csid:item.UNID,khjd:this.khjd,khcs:item});
        modal.present();
    }
}