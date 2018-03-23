import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report-toolbar',
  templateUrl: './report-toolbar.component.html',
  styleUrls: ['./report-toolbar.component.scss']
})
export class ReportToolbarComponent implements OnInit {

  private apiKey: string;

  public title: string;

  public keyStored: boolean;

  constructor(private _reportService: ReportService, private cookieService: CookieService) {
    this.title = 'Weekly Report Generator';
  }

  ngOnInit() {
    // Check if api key in cookie
    if (this.cookieService.check('redmine')) {
      this.keyStored = true;
      this.apiKey = this.cookieService.get('redmine');
      this._reportService.setApiKey(this.apiKey);
    }
  }

  setKey() {
    this._reportService.setApiKey(this.apiKey);
  }

  getReport() {
    if (this.apiKey) {
      this._reportService.loadIssues(this.apiKey);
    }
  }

  storeKey() {
    this.cookieService.set( 'redmine', this.apiKey, 365 ); // set cookie to expire in one year
    this.keyStored = true;
  }

  deleteKey() {
    this.apiKey = null;
    this.keyStored = false;
    this._reportService.setApiKey(null);
    this.cookieService.delete( 'redmine' );
  }

}
