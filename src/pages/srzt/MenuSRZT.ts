import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'menu-srzt',
    templateUrl: 'MenuSRZT.html'
})
export class MenuSrzt {
    items: Array<{ title: string, component: any }>;
    constructor(public navCtrl: NavController) {
        /*
        this.items = [
            {title:'镇街普查',component:Index_pc},
            {title:"乡镇抽查",component:Index_cc},
            {title:"市级督查",component:Index_dc}
        ];
        */
    }

    public itemSelected(item){
        this.navCtrl.push(item.component);
    }
}
