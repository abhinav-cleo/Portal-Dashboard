import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ServiceAdministrationDetails} from "./main/administration/serviceprovider/sp.component";
import {IdentityAdministrationDetails} from "./main/administration/identityprovider/idp.component";
import {HostsComponent} from './main/hosts/hosts.component';
import {SchedulerComponent} from './main/scheduler/scheduler.component';
import {RouterComponent} from './main/router/router.component';
import {PartnersComponent} from './main/partners/partners.component';
import {TransfersComponent} from './main/transfers/transfers.component';
import {LogsComponent} from './main/logs/logs.component';
import {AdministrationComponent} from './main/administration/administration.component';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./auth-guard.service";
import {LoginRouteGuard} from "./login-route-guard";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
      path:'login',
      component: LoginComponent,
    },
    {
        path: 'main',
        component:MainComponent,
        children:[
            {
                path: '',
                component: HostsComponent,
                canActivate: [LoginRouteGuard]
            },
            {
                path: 'scheduler',
                component: SchedulerComponent,
                canActivate: [LoginRouteGuard]
            },
            {
                path: 'router',
                component: RouterComponent,
                canActivate: [LoginRouteGuard]
            },
            {
                path: 'partners',
                component: PartnersComponent,
                canActivate: [LoginRouteGuard]
            },
            {
                path: 'transfers',
                component: TransfersComponent,
                canActivate: [LoginRouteGuard]
            },
            {
                path: 'logs',
                component: LogsComponent,
                canActivate: [LoginRouteGuard]
            },
            {
                path: 'administration',
                component: AdministrationComponent,
                children: [
                    {path: '', component: ServiceAdministrationDetails, canActivate: [LoginRouteGuard]},
                    {path: 'identityprovider', component: IdentityAdministrationDetails, canActivate: [LoginRouteGuard]}
                ]
            }
        ],
        canActivate: [LoginRouteGuard]
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
