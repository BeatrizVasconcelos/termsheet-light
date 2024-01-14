import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealListComponent } from './deal-list.component';
import {  StoreModule } from '@ngrx/store';
import { dealsReducer } from 'src/app/store/deal/deal.reducer';
import { deals } from 'src/app/mocks/deals';
import * as fromDeals from '../../store/deal/index';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';

describe('DealListComponent', () => {
  let component: DealListComponent;
  let fixture: ComponentFixture<DealListComponent>;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealListComponent],
      imports: [
        StoreModule.forFeature('deal', dealsReducer),
        StoreModule.forRoot({}),
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState: { deal: { deals } } }),
        { provide: 'DEALS', useValue: deals }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(DealListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter deals by name', () => {
    component.filterNameControl.setValue('Deal 1');

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].name).toBe('Deal 1');
  });
  
  it('should filter deals by type', () => {
    component.filterTypeControl.setValue('Acquisition');

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].type).toBe('Acquisition');
  });
  
  it('should filter deals by cap rate', () => {
    component.filterCapRateControl.setValue('8');

    expect(component.dataSource.filteredData.length).toBe(2);
    expect(component.dataSource.filteredData[0].capRate).toBe(8);
  });

  it('should navigate to deal details page', () => {
    const dealId = '123';
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');

    component.goToDealDetailsPage(dealId);

    expect(navigateSpy).toHaveBeenCalledWith(`/deal-details/${dealId}`);
  });
  
  it('should navigate to add deal page', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');

    component.goToAddDealPage();

    expect(navigateSpy).toHaveBeenCalledWith('/add-deal');
  });
  
  it('should navigate to edit deal page', () => {
    const dealId = '456';
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');

    component.goToEditPage(dealId);

    expect(navigateSpy).toHaveBeenCalledWith(`/add-deal/${dealId}`);
  });

  it('should dispatch deleteDeal action when deleteDeal is called', () => {
    const dealId = '123';

    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.deleteDeal(dealId);

    expect(dispatchSpy).toHaveBeenCalledWith(fromDeals.deleteDeal({ dealId }));
  });
  
});
