import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFailedPage } from './modal-failed.page';

describe('ModalFailedPage', () => {
  let component: ModalFailedPage;
  let fixture: ComponentFixture<ModalFailedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFailedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
