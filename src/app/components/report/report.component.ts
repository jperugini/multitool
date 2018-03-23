import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { CookieService } from 'ngx-cookie-service';
import { ToolbarService } from '../../services/toolbar.service';
import { ReportToolbarComponent } from './report-toolbar/report-toolbar.component';
import { ReportSubHeader } from '../../definitions/report-sub-header.definition';
import { RedmineIssue } from '../../definitions/redmine-issue.definition';
import { ReportRow } from '../../definitions/report-row.definition';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  private issues: any;

  private apiKey: string;

  private reportSubHeader: ReportSubHeader;

  private data: ReportRow[] = [new ReportRow()];
  private colHeaders: string[] = ['Projects', 'Tasks', 'Contributor(s)', 'Consumed during the period (j/h)',
    'Planned (j/h)', 'Consumed (j/h)', 'Remained to be done (j/h)', 'End date', 'Palan', '% Progress', 'Comments'];
  private columns: any[] = [
    {
      data: 'project'
    },
    {
      data: 'tasks'
    },
    {
      data: 'contributor'
    },
    {
      data: 'consumedPeriod'
    },
    {
      data: 'planned'
    },
    {
      data: 'consumed',
    },
    {
      data: 'remain',
    },
    {
      data: 'endDate'
    },
    {
      data: 'palan'
    },
    {
      data: 'progress',
      type: 'numeric',
      numericFormat: { pattern: '0.00' }
    },
    {
      data: 'comments'
    }
  ];
  private colWidths: number[] = [null, null, null, null, null, null, null, null, null, null];
  private options: any = {
    stretchH: 'all',
    columnSorting: true,
    contextMenu: [
      'row_above', 'row_below', 'remove_row'
    ]
  };

  constructor(private _reportService: ReportService,
    private cookieService: CookieService,
    private _toolbarService: ToolbarService,
    private _changeDetectionRef: ChangeDetectorRef) {
    this.reportSubHeader = new ReportSubHeader();
  }

  ngOnInit() {
    // Update toolbar
    this._toolbarService.setComponentToLoad(ReportToolbarComponent);

    // Get api key if here
    this.subscriptions.push(this._reportService.getApiKey().subscribe(
      key => {
        this.apiKey = key;
        this._changeDetectionRef.detectChanges();
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }

  getRedmineIssues() {
    this.subscriptions.push(this._reportService.getRedmineIssues(this.apiKey).subscribe(
      issues => {
        this.generateReportFromRedmine(issues);
      },
      err => console.log(err)
    ));
  }

  generateReportFromRedmine(issues: Array<RedmineIssue>) {
    // Filter issue if updated on < today
    issues = issues.filter(issue => new Date(issue.updated_on) >= this.getMonday());
    // Reset data
    this.data = [];
    const differentProjects = [];
    issues.forEach(
      issue => {
        if (differentProjects.indexOf(issue.project.name) === -1) {
          differentProjects.push(issue.project.name);
        }
      }
    );
    let lineNumber = 0;
    let projectManagers = [];
    differentProjects.forEach(
      project => {
        // Filter issues for this project
        const projectIssues = issues.filter(
          issue => issue.project.name === project
        );
        const initialLine = lineNumber;
        projectIssues.forEach(
          projectIssue => {
            // Add manager for this project
            if (projectManagers.indexOf(projectIssue.author.name) === -1) { projectManagers.push(projectIssue.author.name); }
            // Add line in spreadsheet
            this.data.push({
              project: project,
              contributor: projectIssue.assigned_to.name + '\n' + projectIssue.author.name,
              tasks: projectIssue.subject,
              consumedPeriod: 0,
              planned: 0,
              consumed: 0,
              remain: 0,
              endDate: '',
              palan: projectIssue.custom_fields.find(field => field.name === 'Fiche Palans').value,
              progress: 0,
              comments: ''
            });
            // Increment line number
            lineNumber++;
          }
        );
        if (projectIssues.length > 1) {
          this.options = {
            ...this.options,
            mergeCells: this.options.mergeCells
              ? [...this.options.mergeCells, { row: initialLine, col: 0, rowspan: projectIssues.length, colspan: 1 }]
              : [{ row: initialLine, col: 0, rowspan: projectIssues.length, colspan: 1 }]
          };
        }
      }
    );

    // Find me
    let me = '';
    if (issues && issues.length > 0) {
      me = issues[0].assigned_to.name;
      this.reportSubHeader.drafter = me;
    }
    // Filter me in the manager
    projectManagers = projectManagers.filter(manager => manager !== me);

    // Fill managers
    this.reportSubHeader.projectManager = projectManagers.join(' - ');
  }

  private afterChange(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }

  private afterOnCellMouseDown(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }

  getMonday(): Date {
    const d = new Date();
    const day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
}
