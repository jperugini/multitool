import { ReportSubHeader } from './report-sub-header.definition';
import { ReportRow } from './report-row.definition';

export class Report {

    public id: number;
    public header: ReportSubHeader;
    public tasks: Array<ReportRow>;

}
