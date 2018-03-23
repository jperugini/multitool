import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwaggerComponent } from './components/swagger/swagger.component';
import { JsonComponent } from './components/json/json.component';
import { JavaComponent } from './components/java/java.component';
import { ReportComponent } from './components/report/report.component';
import { TypescriptCodeComponent } from './components/typescript-code/typescript-code.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'code', pathMatch: 'full' },
    {
        path: 'code', component: TypescriptCodeComponent,
        children: [
            { path: '', redirectTo: 'swagger', pathMatch: 'full' },
            { path: 'swagger', component: SwaggerComponent },
            { path: 'json', component: JsonComponent },
            { path: 'java', component: JavaComponent }
        ]
    },
    { path: 'report', component: ReportComponent },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
