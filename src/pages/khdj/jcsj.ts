import { NavController } from "ionic-angular";
import { Component } from "@angular/core";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { KHDJService } from "./khdjService";
import _ from 'underscore/underscore';
import { MenuKhdj } from '../khdj/MenuKHDJ';
@Component({
    selector: 'jcsj',
    templateUrl: 'jcsj.html'
})
export class JCSJ{
    allItems:any =[];
    constructor(
        public navCtrl: NavController,
        public khdjService: KHDJService
    ){
        this.initData();
    }
    initData(){
        this.khdjService.getKHSJ().subscribe(res =>{
            this.allItems = res;
            //_.each(res,function(item, key){

            //})
        })
    }
    openPage(item){
        this.navCtrl.push(MenuKhdj,{khjd:item.id});
    }
}