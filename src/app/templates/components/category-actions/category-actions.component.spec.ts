import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryActionsComponent } from './category-actions.component';

describe('CategoryActionsComponent', () => {
  let component: CategoryActionsComponent;
  let fixture: ComponentFixture<CategoryActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryActionsComponent]
    });
    fixture = TestBed.createComponent(CategoryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
