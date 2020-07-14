import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareStartupsButtonComponent } from './compare-startups-button.component';

describe('CompareStartupsButtonComponent', () => {
  let component: CompareStartupsButtonComponent;
  let fixture: ComponentFixture<CompareStartupsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareStartupsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareStartupsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
