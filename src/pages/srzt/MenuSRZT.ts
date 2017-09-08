import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SRZTService } from "./srztService";
import _ from 'underscore/underscore';

@Component({
    selector: 'menu-srzt',
    templateUrl: 'MenuSRZT.html'
})
export class MenuSrzt {
    items = [];
    allItems: any=[];

    groups: any = [];
    /*
    add Service,method,srzt Object
    */
    constructor(public navCtrl: NavController,
    private srztService: SRZTService,
    public modalCtrl: ModalController) {
       this.initData();
    }
    
    initData() {
        this.srztService.getSRZT().subscribe(csobjs => {
            this.allItems = csobjs;
            _.each(_.groupBy(csobjs, function (item) { return item.SSQX; }), function (item, key) {
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
        console.log('Async operation has ended');
        infiniteScroll.complete();
    }
    getItems(){}
    presentModal(item) {
        //let modal = this.modalCtrl.create(KHDJModal, { csid: item.UNID, khjd: this.khjd, khcs: item });
        //modal.present();
    }
    toggleGroup(group) {
        group.show = !group.show;
    };
    isGroupShown(group) {
        return group.show;
    };
}
