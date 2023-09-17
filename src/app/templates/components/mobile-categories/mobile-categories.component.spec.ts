import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCategoriesComponent } from './mobile-categories.component';

describe('MobileCategoriesComponent', () => {
  let component: MobileCategoriesComponent;
  let fixture: ComponentFixture<MobileCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileCategoriesComponent]
    });
    fixture = TestBed.createComponent(MobileCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
