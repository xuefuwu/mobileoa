import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { TestService } from "./TestService";
import { HttpServiceProvider } from "../../providers/http-service";
import { NativeService } from "../../providers/NativeService";
import { csObject } from '../../modules/csgl'
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
      this.allItems = csobjs;
      for (let i = 0; i < 30; i++) {
        this.items.push(this.allItems[i]);
        this.allItems.splice(i, 1);
      }
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
      for (let i = 0; i < 30; i++) {
        this.items.push(this.allItems[i]);
        this.allItems.splice(i, 1);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
