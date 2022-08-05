import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalOtpPage } from './modal-otp.page';

describe('ModalOtpPage', () => {
  let component: ModalOtpPage;
  let fixture: ComponentFixture<ModalOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOtpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
