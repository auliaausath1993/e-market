import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryListingPage } from './category-listing.page';

describe('CategoryListingPage', () => {
  let component: CategoryListingPage;
  let fixture: ComponentFixture<CategoryListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
