import { Owner } from "../pages/login/user";
export class AppConfig {
    private currentUser: Owner;
    private domain:string;
    private api:string;
    constructor() {
        this.domain = "http://localhost:8100";
        //this.domain = "http://oa.wzmzzj.gov.cn/www/";
        this.api = "http://www.fbvinc.com:8137/weboa";
    }
    get Domain(){
        return this.domain;
    }
    get API_URL(){
        return this.api;
    }
    set User(user) {
        this.currentUser = user;
    }
    get User() {
        return this.currentUser;
    }
}