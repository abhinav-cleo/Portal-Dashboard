import {Component} from '@angular/core';
import {Router} from "@angular/router";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {APIService} from "../api.service";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {Response} from "@angular/http";

@Component({
    templateUrl: 'app/login/login.html'
})
export class LoginComponent {
    private user: string;
    private password: string;

    constructor(private router: Router, private _backend: APIService, public toastr: ToastsManager) {
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
                        this.toastr.success("Successfully Logged In");
                        this.router.navigate(['/main']);
                    }
                    else {
                        this.user = '';
                        this.toastr.error('Sorry Unable to Connect to Harmony Servers');
                        this.router.navigate(['/login']);
                    }
                },
                error => {
                    Cookie.delete('session')
                    Cookie.set('session',JSON.stringify(error));
                    this.toastr.error('Wrong Credentials');
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
            this.toastr.warning("Valid Email is required");
            return false;
        }
        else {
            return true;
        }
    }
}