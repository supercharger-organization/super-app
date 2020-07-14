import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionButtonComponent } from './session-button.component';

describe('SessionButtonComponent', () => {
  let component: SessionButtonComponent;
  let fixture: ComponentFixture<SessionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
