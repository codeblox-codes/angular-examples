import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateAccountCodeComponent } from './validate-account-code.component';

describe('ValidateAccountCodeComponent', () => {
  let component: ValidateAccountCodeComponent;
  let fixture: ComponentFixture<ValidateAccountCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateAccountCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateAccountCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
