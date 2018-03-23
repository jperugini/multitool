import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptCodeComponent } from './typescript-code.component';

describe('TypescriptCodeComponent', () => {
  let component: TypescriptCodeComponent;
  let fixture: ComponentFixture<TypescriptCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypescriptCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescriptCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
