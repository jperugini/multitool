import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Report } from '../definitions/report.definition';

@Injectable()
export class ReportService {

  private issues: Subject<any> = new Subject();

  private apiKey: Subject<any> = new Subject();

  constructor(private _http: HttpClient) { }

  loadIssues(apiKey: string): void {
    this._http.get('api/issues/' + apiKey).subscribe(
      issues => this.issues.next(issues),
      err => console.error(err)
    );
  }

  getIssues(): Observable<any> {
    return this.issues.asObservable();
  }

  getRedmineIssues(apiKey: string): Observable<any> {
    return this._http.get('api/issues/' + apiKey);
  }

  setApiKey(apiKey: string): void {
    this.apiKey.next(apiKey);
  }

  getApiKey(): Observable<string> {
    return this.apiKey.asObservable();
  }

  exportReport(report: Report): Observable<any> {
    return this._http.post('api/export/', report, {
      responseType: 'blob'
    });
  }

}
