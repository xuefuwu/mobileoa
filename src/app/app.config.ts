import { Owner } from "../pages/login/user";
export class AppConfig {
    private currentUser: Owner;
    constructor() {

    }
    setUser(user) {
        this.currentUser = user;
    }
    getUser() {
        return this.currentUser;
    }
}