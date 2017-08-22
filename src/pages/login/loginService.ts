import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { HttpServiceProvider } from "../../providers/http-service";
import { StorageService } from "../../providers/StorageService";

@Injectable()
export class LoginService{
    local: Storage;
    API_URL:string = "/api/user/ajax.jsp";

    constructor(
        public http: Http, 
        public httpService: HttpServiceProvider, 
        public storageService: StorageService){

    }
    login(user){
        var params = { f:"userLogin",username:user.username,password:user.password };
        return this.httpService.get(this.API_URL,params).map((res: Response)=>res.json());
    }

    getUserInfo(id:string){
        var params = { f:"getUser", userId:id };
        return this.httpService.get(this.API_URL,params).map((res: Response)=>res.json());
    }
}