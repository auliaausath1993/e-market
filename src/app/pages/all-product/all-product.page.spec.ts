import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllProductPage } from './all-product.page';

describe('AllProductPage', () => {
  let component: AllProductPage;
  let fixture: ComponentFixture<AllProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
