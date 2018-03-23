export class ReportSubHeader {

    public id: number;
    public provider: string;
    public drafter: string;
    public draftingDate: string;
    public period: string;
    public week: number;
    public projectManager: string;
    public working: number;
    public holidays: number;
    public vacations: number;
    public sick: number;


    constructor(provider: string = 'BRED IT', drafter: string = '', projectManager: string = '') {
        // Get today date
        const today = new Date();
        const date = this.getDateToString(today);

        this.provider = provider;
        this.drafter = drafter;
        this.draftingDate = date;
        this.period = this.getPeriod(today);
        this.week = this.getWeek(today);
        this.projectManager = projectManager;
        this.working = 5;
        this.holidays = 0;
        this.vacations = 0;
        this.sick = 0;
    }

    getWeek(date): number {
        if (!(date instanceof Date)) {
            date = new Date();
        }

        // ISO week date weeks start on Monday, so correct the day number
        const nDay = (date.getDay() + 6) % 7;

        // ISO 8601 states that week 1 is the week with the first Thursday of that year
        // Set the target date to the Thursday in the target week
        date.setDate(date.getDate() - nDay + 3);

        // Store the millisecond value of the target date
        const n1stThursday = date.valueOf();

        // Set the target to the first Thursday of the year
        // First, set the target to January 1st
        date.setMonth(0, 1);

        // Not a Thursday? Correct the date to the next Thursday
        if (date.getDay() !== 4) {
            date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
        }

        // The week number is the number of weeks between the first Thursday of the year
        // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
        return 1 + Math.ceil((n1stThursday - date) / 604800000);
    }

    getPeriod(date: Date): string {
        const curr = new Date; // get current date
        const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
        const last = first + 4; // last day is the first day + 6

        const firstday = new Date(curr.setDate(first));
        const lastday = new Date(curr.setDate(last));

        const period = 'from ' + this.getDateToString(firstday)
                        + ' to ' + this.getDateToString(lastday);

        return period;
    }

    getDateToString(date: Date): string {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

}
