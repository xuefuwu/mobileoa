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
  
  getJson() {
    let params = {f:"getData"};
    return this.httpService.get("/api/csgl/ajax.jsp",params).map((res: Response) => res.json());
  }

  getObj(): Observable<TestObj> {
    return this.httpService.get('/assets/data/test.json').map((res: Response) => res.json());
  }

  getList(): Observable<TestObj[]> {
    return this.httpService.get('/assets/data/testList.json').map((res: Response) => res.json());
  }

}