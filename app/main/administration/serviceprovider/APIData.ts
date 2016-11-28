import {Cookie} from "ng2-cookies/src/services/cookie";
/**
 * Created by abhinavnathgupta on 15/11/16.
 */
export class APIData {
     serviceEndpoint: string;
     logoutEndpoint: string;
     signingCertificate: string;
     encryptionCertificate: string;
     encryptionPassword: string;
     encryptionAlgorithm: string;
     idFormat: string;
     EntityId: string;
     
     generateJSON(){
         var params = {
             "id": this.EntityId,
             "serviceendpoint": this.serviceEndpoint,
             "logoutendpoint": this.logoutEndpoint,
             "signingcertificate": this.signingCertificate,
             "password": this.encryptionPassword,
             "encryptioncertificate": this.encryptionCertificate,
             "algorithm": this.encryptionAlgorithm,
             "format": this.idFormat,
             'session': Cookie.get('session'),
             'expires' : Cookie.get('expires')
         };
         return params;
     }

    clearForm() {
        this.serviceEndpoint = "";
        this.logoutEndpoint = "";
        this.signingCertificate = "";
        this.encryptionCertificate = "";
        this.encryptionPassword = "";
        this.encryptionAlgorithm = "SHA1";
        this.idFormat = "Email";
        this.EntityId = "";
    }

     createJSONObject(input: any) {
        this.serviceEndpoint = input.serviceendpoint;
        this.logoutEndpoint = input.logoutendpoint;
        this.signingCertificate = input.signingcertificate;
        this.encryptionCertificate = input.encryptioncertificate;
        this.encryptionPassword = input.password;
        this.encryptionAlgorithm = input.algorithm;
        this.idFormat = input.format;
        this.EntityId = input.id;
    }
}