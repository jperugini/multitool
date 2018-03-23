import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { SwaggerComponent } from './components/swagger/swagger.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SwaggerConvertService } from './services/swagger-convert.service';
import { JsonComponent } from './components/json/json.component';
import { JavaComponent } from './components/java/java.component';
import { CodeareaComponent } from './components/codearea/codearea.component';
import { ConvertedFilesComponent } from './components/converted-files/converted-files.component';
import { ReportComponent } from './components/report/report.component';
import { HttpClientModule } from '@angular/common/http';
import { TypescriptCodeComponent } from './components/typescript-code/typescript-code.component';
import { ReportService } from './services/report.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxAsideModule } from 'ngx-aside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportToolbarComponent } from './components/report/report-toolbar/report-toolbar.component';
import { ToolbarService } from './services/toolbar.service';
import { ReportSubHeaderComponent } from './components/report/report-sub-header/report-sub-header.component';
import { HotTableModule } from 'ng2-handsontable';

@NgModule({
  declarations: [
    AppComponent,
    SwaggerComponent,
    NavigationComponent,
    JsonComponent,
    JavaComponent,
    CodeareaComponent,
    ConvertedFilesComponent,
    ReportComponent,
    TypescriptCodeComponent,
    ReportToolbarComponent,
    ReportSubHeaderComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    HighlightModule.forRoot(),
    NgxAsideModule,
    BrowserAnimationsModule,
    HotTableModule
  ],
  providers: [
    SwaggerConvertService,
    ReportService,
    ToolbarService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
