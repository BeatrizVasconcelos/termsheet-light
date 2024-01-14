import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { addDeal, deleteDeal, editDeal, getDeals, loadDeal, loadDealSuccess, loadDealsSuccess } from './deals.actions';
import { DealService } from 'src/app/shared/services/deal.service';

@Injectable()
export class DealEffects {

  constructor(
    private actions$: Actions,
    private dealsService: DealService
  ) {}

  getDeals$ = createEffect(() => this.actions$.pipe(
    ofType(getDeals),
    mergeMap(() => this.dealsService.getDeals().pipe(
      map(deals => loadDealsSuccess({ deals }))
    ))
  ));

  loadDeal$ = createEffect(() => this.actions$.pipe(
    ofType(loadDeal),
    mergeMap(({ dealId }) => this.dealsService.getDealById(dealId).pipe(
      map(deal => loadDealSuccess({ deal }))
    ))
  ));

  deleteDeal$ = createEffect(() => this.actions$.pipe(
    ofType(deleteDeal),
    mergeMap(({ dealId }) => this.dealsService.deleteDeal(dealId).pipe(
      map(() => getDeals())
    ))
  ));

  addDeal$ = createEffect(() => this.actions$.pipe(
    ofType(addDeal),
    mergeMap(({ deal }) => this.dealsService.addNewDeal(deal).pipe(
      map(() => getDeals())
    ))
  ));

  editDeal$ = createEffect(() => this.actions$.pipe(
    ofType(editDeal),
    mergeMap(({ deal }) => this.dealsService.editDeal(deal).pipe(
      map(() => getDeals())
    ))
  ));
}
