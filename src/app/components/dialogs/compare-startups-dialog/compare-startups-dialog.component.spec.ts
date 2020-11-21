import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareStartupsDialogComponent } from './compare-startups-dialog.component';

describe('CompareStartupsDialogComponent', () => {
  let component: CompareStartupsDialogComponent;
  let fixture: ComponentFixture<CompareStartupsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareStartupsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareStartupsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
