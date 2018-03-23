import { Component, OnInit, Input } from '@angular/core';
import { ReportSubHeader } from '../../../definitions/report-sub-header.definition';

@Component({
  selector: 'app-report-sub-header',
  templateUrl: './report-sub-header.component.html',
  styleUrls: ['./report-sub-header.component.scss']
})
export class ReportSubHeaderComponent implements OnInit {

  @Input() subHeader: ReportSubHeader;

  constructor() { }

  ngOnInit() {
  }

  recalculateWorking() {
    this.subHeader.working = 5 - this.subHeader.holidays - this.subHeader.vacations - this.subHeader.sick;
  }

}
