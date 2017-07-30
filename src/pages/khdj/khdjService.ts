import { Injectable } from "@angular/core";
import {Response, Http,URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {HttpServiceProvider} from "../../providers/http-service";

@Injectable()
export class KHDJService {
    constructor(public http: Http, public httpService: HttpServiceProvider){

    }

    getKHSJ(){
        let params = {f: "getData"};
        return this.httpService.get("/api/jcsjgl/ajax.jsp",params).map((res: Response)=>res.json());
    }
}