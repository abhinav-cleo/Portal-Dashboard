import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()
export class APIService {
    constructor(private http: Http) {
    }

    private base_Url = 'http://localhost:3000/';

    readData(params) {
        const endPoint = 'api/read'
        return this.http
            .post(this.base_Url + endPoint, params)
            .map(response => {
                return response
            });
    }

    saveData(params) {
        const endPoint = 'api/save';
        return this.http
            .post(this.base_Url + endPoint, params)
            .map(response => {
                return response
            });
    }

    login(params) {
        const endPoint = 'api/login';
        return this.http
            .post(this.base_Url + endPoint, params)
            .map(response => {
                return response
            });
    }

    authData(){
        if(Cookie.get('session')){
            return true;
        }
        else {
            return false;
        }
    }

    dataArray () {
        return ["ABC Inc","DEF Inc","GHI Inc"];
    }
}
