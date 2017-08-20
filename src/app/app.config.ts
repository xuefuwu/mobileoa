import { Owner } from "../pages/login/user";
export class AppConfig {
    private currentUser: Owner;
    private domain:string;
    constructor() {
        this.domain = "http://192.168.0.102:8100";
    }
    get Domain(){
        return this.domain;
    }
    set User(user) {
        this.currentUser = user;
    }
    get User() {
        return this.currentUser;
    }
}