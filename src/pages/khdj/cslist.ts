import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { KHDJService } from "./khdjService";
import { HttpServiceProvider } from "../../providers/http-service";
import { NativeService } from "../../providers/NativeService";
import { csObject } from '../../modules/csgl'

@Component({
    selector: 'list_cs',
    templateUrl: 'cslist.html'
})
export class CSList {
    items = [];
    public allItems: csObject[];
    ssqx: string;
    khnd: string;
    constructor(
        public navCtrl: NavController,
        public khdjService: KHDJService,
        //private storageService: StorageService,
        private navParams: NavParams
    ) {
        this.ssqx = this.navParams.get("ssqx");
        this.khnd = this.navParams.get("khnd");
    }
    ionViewDidLoad() {
        this.khdjService.getcsList(this.ssqx, this.khnd).subscribe((csobjs: csObject[]) => {
            this.allItems = csobjs;
            var length = this.allItems.length < 15 ? this.allItems.length : 15;
            for (let i = 0; i < length; i++) {
                this.items.push(this.allItems[i]);

                console.log(length + "_" + i + "_" + this.allItems.length);
            }
            this.allItems.splice(0, length);
        });
    }
    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        setTimeout(() => {
            var length = this.allItems.length < 15 ? this.allItems.length : 15;
            for (let i = 0; i < length; i++) {
                this.items.push(this.allItems[i]);
                console.log(length + "_" + i + "_" + this.allItems.length);
            }
            this.allItems.splice(0, length);
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }
}