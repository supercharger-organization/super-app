import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupDetailComponent } from './startup-detail.component';

describe('CardDetailComponent', () => {
  let component: StartupDetailComponent;
  let fixture: ComponentFixture<StartupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
