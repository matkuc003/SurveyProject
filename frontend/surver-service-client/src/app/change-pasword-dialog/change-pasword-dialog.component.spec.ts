import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePaswordDialogComponent } from './change-pasword-dialog.component';

describe('ChangePaswordDialogComponent', () => {
  let component: ChangePaswordDialogComponent;
  let fixture: ComponentFixture<ChangePaswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePaswordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePaswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
