/**
 * Created by abhinavnathgupta on 20/10/16.
 */
import {Component} from '@angular/core';
import {Cookie} from "ng2-cookies/src/services/cookie";
import {Router} from "@angular/router";
@Component({
    selector: 'my-app',
    templateUrl: 'app/main/main.html',
})
export class MainComponent {
    constructor(private router:Router){

    }
    logout(){
        Cookie.delete('session');
        Cookie.delete('expires');
        this.router.navigate(['/login']);
    }
}