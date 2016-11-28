import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {ToastModule} from "ng2-toastr/ng2-toastr";
import {AppComponent} from "./app.component";
import {ServiceAdministrationDetails} from "./main/administration/serviceprovider/sp.component";
import {IdentityAdministrationDetails} from "./main/administration/identityprovider/idp.component";
import {APIService} from "./api.service";
import {routing} from "./app.routes";
import {HostsComponent} from "./main/hosts/hosts.component";
import {SchedulerComponent} from "./main/scheduler/scheduler.component";
import {RouterComponent} from "./main/router/router.component";
import {PartnersComponent} from "./main/partners/partners.component";
import {TransfersComponent} from "./main/transfers/transfers.component";
import {LogsComponent} from "./main/logs/logs.component";
import {AdministrationComponent} from "./main/administration/administration.component";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {LoginRouteGuard} from "./login-route-guard";
import {SignatureModal} from "./main/administration/serviceprovider/partials/signature.component";

@NgModule({
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        ToastModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    declarations: [
        MainComponent,
        AppComponent,
        LoginComponent,
        SignatureModal,
        IdentityAdministrationDetails,
        ServiceAdministrationDetails,
        HostsComponent,
        SchedulerComponent,
        RouterComponent,
        PartnersComponent,
        TransfersComponent,
        LogsComponent,
        AdministrationComponent
    ],
    entryComponents: [SignatureModal],
    providers: [
        APIService,
        LoginRouteGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

