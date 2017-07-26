import {Injectable} from '@angular/core';
import {Response, Http,URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {TestObj} from "./TestObj";
import { csObject } from '../../modules/csgl'
import {HttpServiceProvider} from "../../providers/http-service";

@Injectable()
export class TestService {
  constructor(public http: Http, public httpService: HttpServiceProvider) {
  }
  private domain:string = "http://192.168.1.143:8100";
  getJson() {
    let params = {f:"getData"};
    return this.httpService.get(this.domain+'/api/csgl/ajax.jsp',params).map((res: Response) => res.json());
  }

  getObj(): Observable<TestObj> {
    return this.httpService.get('/assets/data/test.json').map((res: Response) => res.json());
  }

  getList(): Observable<TestObj[]> {
    return this.httpService.get('/assets/data/testList.json').map((res: Response) => res.json());
  }

}