import { Owner } from "../pages/login/user";
export class AppConfig {
    private currentUser: Owner;
    private domain:string;
    private api:string;
    constructor() {
        //this.domain = "http://192.168.0.102:8100";
        this.domain = "http://oa.wzmzzj.gov.cn/www/";
        this.api = "http://oa.wzmzzj.gov.cn/weboa";
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