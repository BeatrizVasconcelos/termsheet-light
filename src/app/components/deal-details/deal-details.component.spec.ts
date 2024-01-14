import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealDetailsComponent } from './deal-details.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';

describe('DealDetailsComponent', () => {
  let component: DealDetailsComponent;
  let fixture: ComponentFixture<DealDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => {}
              }
            }
          }
        },
        {
          provide: Store, useValue: MockStore
        }
      ],
    });
    fixture = TestBed.createComponent(DealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
