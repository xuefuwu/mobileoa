import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { LoginService } from './LoginService';
import { StorageService } from '../../providers/StorageService';
import { HomePage } from '../home/home';
import { AppConfig } from "../../app/app.config";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    local: Storage;
    constructor(
        public navCtrl: NavController,
        private formBuilder: FormBuilder,
        public toastCtrl: ToastController,
        private storageService: StorageService,
        private loginService: LoginService,
        public appConfig:AppConfig
    ) {
        this.storageService.clear();
        this.storageService.write('user', "");
    }
    loginForm = this.formBuilder.group({
        'username':[],
        'password':[]
    });
    
    login(user,_event){
        //_event.preventDefalut();
        this.loginService.login(user).subscribe(data=>{
            if(data.userid!='0'){
                this.storageService.write('UserInfo', data.userid);
                this.loginService.getUserInfo(data.userid).subscribe(userinfo=>{
                    this.storageService.write('user', userinfo[0]);
                })
                this.navCtrl.setRoot(HomePage);
                
            }else {
                let toast = this.toastCtrl.create({
                    message: '用户名或密码错误.',
                    duration: 3000,
                    position: 'middle',
                    showCloseButton: true,
                    closeButtonText: '关闭'
                });
                toast.present();
            }
        })
    }
}