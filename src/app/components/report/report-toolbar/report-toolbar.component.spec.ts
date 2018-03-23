import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportToolbarComponent } from './report-toolbar.component';

describe('ReportToolbarComponent', () => {
  let component: ReportToolbarComponent;
  let fixture: ComponentFixture<ReportToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
