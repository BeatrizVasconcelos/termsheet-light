import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealFormComponent } from './deal-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { dealsReducer } from 'src/app/store/deal/deal.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { deals } from 'src/app/mocks/deals';

describe('DealFormComponent', () => {
  let component: DealFormComponent;
  let fixture: ComponentFixture<DealFormComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealFormComponent],
      imports: [
        StoreModule.forFeature('deal', dealsReducer),
        StoreModule.forRoot({}),
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
      ],
      providers: [
        provideMockStore({ initialState: { deal: deals } }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(DealFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form', () => {
    component.loadForm();
  });

  it('should load an existing deal', () => {
    component.dealId = '2';
    jest.spyOn(store, 'dispatch');
    component.loadExistingDeal();
  });

  it('should add a deal', () => {
    jest.spyOn(store, 'dispatch');
    component.addNewDeal();
  });

  it('should save an existing deal', () => {
    component.dealId = '2';
    jest.spyOn(store, 'dispatch');
    component.addNewDeal();
  });

});
