import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSendingFormComponent } from './email-sending-form.component';

describe('EmailSendingFormComponent', () => {
  let component: EmailSendingFormComponent;
  let fixture: ComponentFixture<EmailSendingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSendingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSendingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
