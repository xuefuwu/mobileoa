import { Injectable } from "@angular/core";
import { Response, Http, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { HttpServiceProvider } from "../../providers/http-service";

@Injectable()
export class KHDJService {
    constructor(public http: Http, public httpService: HttpServiceProvider) {

    }

    doget(params: any) {
        return this.httpService.get("/api/jcsjgl/ajax.jsp", params).map((res: Response) => res.json());
    }
    getKHSJ() {
        var params = { f: "getData" };
        return this.doget(params);
    }
    getcsbyssqx(ssqx: string) {
        var params = { f: "getcsbyssqx", ssqx: ssqx };
        return this.doget(params);
    }
    getAllcsCount(ssqx: string) {
        var params = { f: "allcs", ssqx: ssqx };
        return this.doget(params);
    }
    getAmountAllNotCompleted(khnd:string, ssdq: string){
        var params = {f:"getAmountAllNotCompleted",khnd:khnd,ssdq:ssdq};
        return this.doget(params);
    }
}