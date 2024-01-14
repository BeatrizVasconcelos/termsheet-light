import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealDetailsComponent } from './deal-details.component';

describe('DealDetailsComponent', () => {
  let component: DealDetailsComponent;
  let fixture: ComponentFixture<DealDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealDetailsComponent]
    });
    fixture = TestBed.createComponent(DealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});