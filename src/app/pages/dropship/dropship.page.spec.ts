import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DropshipPage } from './dropship.page';

describe('DropshipPage', () => {
  let component: DropshipPage;
  let fixture: ComponentFixture<DropshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropshipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DropshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
