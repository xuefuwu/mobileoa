import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { TestService } from "./TestService";
import { HttpServiceProvider } from "../../providers/http-service";
import { NativeService } from "../../providers/NativeService";
import { csObject } from '../../modules/csgl';
import _ from 'underscore/underscore';
/**
 * Generated class for the TestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage implements OnInit {
  items = [];
  public allItems: csObject[];
  constructor(private nativeService: NativeService,
    private httpService: HttpServiceProvider,
    public testService: TestService
  ) {

  }
  ngOnInit() {
    this.testService.getJson().subscribe((csobjs: csObject[]) => {
      
      this.allItems = _.sortBy(csobjs, function (item) { return item.SSQX; });;
      var length = this.allItems.length < 15 ? this.allItems.length : 15;
      for (let i = 0; i < length; i++) {
        this.items.push(this.allItems[i]);

        console.log(length + "_" + i + "_" + this.allItems.length);
      }
      this.allItems.splice(0, length);
    });
  }
  getJsonData() {
    this.testService.getJson().subscribe((csobjs: csObject[]) => {
      this.allItems = csobjs;
    })
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
