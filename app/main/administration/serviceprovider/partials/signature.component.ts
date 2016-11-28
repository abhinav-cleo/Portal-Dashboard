import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {APIService} from "../../../../api.service";
@Component({
    selector: 'ngbd-modal-content',
    templateUrl: 'app/main/administration/serviceprovider/partials/signature.html'
})
export class SignatureModal {
    private items: string[];
    private selected: string;

    constructor(public activeModal: NgbActiveModal, private _backend: APIService) {
        this.items = _backend.dataArray();
    }
}