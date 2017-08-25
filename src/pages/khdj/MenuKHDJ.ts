import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Index_pc } from "./pc/indexpc";
import { Index_dc } from "./dc/indexdc";
import { Index_cc } from "./cc/indexcc";

@Component({
    selector: 'menu-khdj',
    templateUrl: 'MenuKHDJ.html'
})
export class MenuKhdj {
    items: Array<{ title: string, component: any }>;
    khjd:string;
    constructor(public navCtrl: NavController,public navParams: NavParams) {
        this.items = [
            {title:'镇街普查',component:Index_pc},
            {title:"乡镇抽查",component:Index_cc},
            {title:"市级督查",component:Index_dc}
        ]
        this.khjd = this.navParams.get("khjd");
    }

    public itemSelected(item){
        this.navCtrl.push(item.component,{khjd:this.khjd});
    }
}
