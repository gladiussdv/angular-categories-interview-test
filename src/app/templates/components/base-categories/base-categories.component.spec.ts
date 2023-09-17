import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCategoriesComponent } from './base-categories.component';

describe('BaseCategoriesComponent', () => {
  let component: BaseCategoriesComponent;
  let fixture: ComponentFixture<BaseCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseCategoriesComponent]
    });
    fixture = TestBed.createComponent(BaseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
