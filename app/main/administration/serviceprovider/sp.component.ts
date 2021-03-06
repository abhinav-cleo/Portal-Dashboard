import {Component, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {APIService} from "../../../api.service";
import {Response} from "@angular/http";
import {Cookie} from "ng2-cookies/src/services/cookie";
import {SignatureModal} from "./partials/signature.component";
import {APIData} from "./APIData";
import {Router} from "@angular/router";
import {ToasterService} from "angular2-toaster";

@Component({
    templateUrl: 'app/main/administration/serviceprovider/sp.html',
    providers: [APIData]
})
export class ServiceAdministrationDetails implements OnInit {
    public read: any;
    private apiData: APIData = new APIData();
    // NgbModal follows a convention to be declared in constructor of the component
    constructor(private router: Router, private _backend: APIService, private modalService: NgbModal, private toasterService: ToasterService) {
    }

    openSignatureList() {
        this.modalService.open(SignatureModal).result.then((result) => {
                this.apiData.encryptionCertificate = result;
            },
            (reason) => {
                console.log(reason);
            });
    }

    saveData() {
        this._backend.saveData(this.apiData.generateJSON()).subscribe(
            data => {
                if(JSON.parse(data['_body']).status == 400){
                    this.toasterService.pop('error', 'Token Expired', 'Token Expired');
                    this.router.navigate(['/login']);
                }
                else{
                    this.apiData.createJSONObject(JSON.parse(data['_body']).message);
                    this.toasterService.pop('success', 'Data is been fetched from the API Successfully', 'Data is been fetched from the API Successfully');
                }
            },
            error => {
                this.toasterService.pop('error', 'Data writing to the API failed', 'Data writing to the API failed');
            },
            () => console.log('Writing Data complete')
        );
    }

    ngOnInit() {
        this.apiData.clearForm();
        var params = {
            'session': Cookie.get('session'),
            'expires' : Cookie.get('expires')
        };
        this.read = this._backend.readData(params).subscribe(
            (data: Response) => {
                if(JSON.parse(JSON.parse(data['_body']).status) == 400){
                    this.toasterService.pop('error', 'Token Expired', 'Token Expired');
                    this.router.navigate(['/login']);
                }
                else{
                    this.apiData.createJSONObject(JSON.parse(JSON.parse(data['_body']).message));
                    this.toasterService.pop('success', 'Data is been fetched from the API Successfully', 'Data is been fetched from the API Successfully');
                }
            },
            error => {
                this.toasterService.pop('error', 'Data reading to the API failed', 'Data reading to the API failed');
            },
            () => console.log('Reading Data complete')
        );
    }

    ngOnDestroy() {
        this.read.unsubscribe();
    }
}