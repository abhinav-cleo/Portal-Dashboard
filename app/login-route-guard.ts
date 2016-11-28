/**
 * Created by abhinavnathgupta on 04/11/16.
 */
import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { APIService } from './api.service';
@Injectable()
export class LoginRouteGuard implements CanActivate {
    constructor(private loginService: APIService, private router: Router) {}
    canActivate() {
        console.info('route changed');
         if(this.loginService.authData()){
             return this.loginService.authData();
         }
         else{
             this.router.navigate(['/login']);
             return false;
         }
    }
}