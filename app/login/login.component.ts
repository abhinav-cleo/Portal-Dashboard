import {Component} from '@angular/core';
import {Router} from "@angular/router";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {APIService} from "../api.service";
import {Response} from "@angular/http";
import {ToasterService} from "angular2-toaster";

@Component({
    templateUrl: 'app/login/login.html'
})
export class LoginComponent {
    private user: string;
    private password: string;

    constructor(private router: Router, private _backend: APIService, private toasterService: ToasterService) {
    }

    signed() {
        if(this.validateEmail(this.user)){
            var params = {
                "id":this.user,
                "password": this.password
            };
            this._backend.login(params).subscribe(
                (data:Response) => {
                    Cookie.delete('session')
                    Cookie.set('session',JSON.parse(data["_body"]).message);
                    Cookie.set('expires',JSON.parse(data["_body"]).expires);
                    if(JSON.parse(data["_body"]).status == 1){
                        this.router.navigate(['/main']);
                        this.toasterService.pop('success', 'Successfully Logged In', 'Successfully Logged In');
                    }
                    else {
                        this.user = '';
                        this.toasterService.pop('error','Sorry Unable to Connect to Harmony Servers', 'Sorry Unable to Connect to Harmony Servers');
                        this.router.navigate(['/login']);
                    }
                },
                error => {
                    Cookie.delete('session')
                    Cookie.set('session',JSON.stringify(error));
                    this.toasterService.pop('error','Wrong Credentials', 'Wrong Credentials');
                    this.router.navigate(['/login']);
                },
                () => console.log('Logging in Complete')
            );
        }
        else{
            this.router.navigate(['/login']);
        }
    }

    validateEmail(newValue){
        if(!newValue || (newValue == '')){
            return false;
        }
        else {
            return true;
        }
    }
}