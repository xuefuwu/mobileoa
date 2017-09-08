import { Injectable } from "@angular/core";
import { Response, Http, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { HttpServiceProvider } from "../../providers/http-service";

@Injectable()
export class SRZTService {
    url_srzt: string="/api/srzt/ajax.jsp";
    constructor(public http: Http, public httpService: HttpServiceProvider) {
    }

    doget(url: string,params: any) {
        return this.httpService.get(url, params).map((res: Response) => res.json());
    }
    dopost(url: string, params: any){
        return this.httpService.post1(url,params).map((res:Response) =>res.json());
    }
    getSRZT() {
        var params = { f: "getAllsrzt" };
        return this.doget(this.url_srzt,params);
    }
   

}