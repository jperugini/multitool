import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSubHeaderComponent } from './report-sub-header.component';

describe('ReportSubHeaderComponent', () => {
  let component: ReportSubHeaderComponent;
  let fixture: ComponentFixture<ReportSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
