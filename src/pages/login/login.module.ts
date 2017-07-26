import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoginPage } from './login';
import { LoginService } from './LoginService';
import { Owner } from './user';

@NgModule({
imports:[
    IonicModule
],
declarations:[
    LoginPage
],
entryComponents:[
    LoginPage
],
providers:[
    LoginService,
    Owner
]
})
export class LoginModule{

}