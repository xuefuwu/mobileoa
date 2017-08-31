import { Injectable } from "@angular/core";
import { Response, Http, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { HttpServiceProvider } from "../../providers/http-service";

@Injectable()
export class KHDJService {
    url_jcsjgl: string="/api/jcsjgl/ajax.jsp";
    url_khtj: string= "/api/khtj/ajax.jsp";
    constructor(public http: Http, public httpService: HttpServiceProvider) {
    }

    doget(url: string,params: any) {
        return this.httpService.get(url, params).map((res: Response) => res.json());
    }
    dopost(url: string, params: any){
        return this.httpService.post1(url,params).map((res:Response) =>res.json());
    }
    getKHSJ() {
        var params = { f: "getData" };
        return this.doget(this.url_jcsjgl,params);
    }
    getcsbyssqx(ssqx: string) {
        var params = { f: "getcsbyssqx", ssqx: ssqx };
        return this.doget(this.url_khtj,params);
    }
    getAllcsCount(ssqx: string) {
        var params = { f: "allcs", ssqx: ssqx };
        return this.doget(this.url_khtj,params);
    }
    getAmountAllNotCompleted(khnd:string, ssdq: string){
        var params = {f:"getAmountAllNotCompleted",khnd:khnd,ssdq:ssdq};
        return this.doget(this.url_khtj,params);
    }

    getcsList(ssqx: string, khnd: string){
        let params = {f:"getAllData",ssqx: ssqx,khnd: khnd};
        return this.doget(this.url_khtj,params);
    }

    getkhtz(khjd: string, csid: string){
        let params = { f: "getkhdj", khjd: khjd, csid: csid};
        return this.doget(this.url_khtj,params);
    }

    getImgs(khid: string ,type: string){
        let params = {f: "getImg",unid: khid, type:type,moduleid:"khdj"};
        return this.doget(this.url_khtj,params);
    }
    removeImgs(attachid: string ){
        let params = {f: "removeImg",unid: attachid};
        return this.doget(this.url_khtj,params);
    }

    postkhdj(body:any){

        let params = new FormData();
        params.append("action", "postkhdj");
        params.append("khjg",body);
        return this.dopost("/api/khtj/formpost.jsp",params);
    }

}