import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertedFilesComponent } from './converted-files.component';

describe('ConvertedFilesComponent', () => {
  let component: ConvertedFilesComponent;
  let fixture: ComponentFixture<ConvertedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
