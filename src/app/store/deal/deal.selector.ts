import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DealState } from './deal-state.interface';

export const selectDealState = createFeatureSelector<DealState>('deal');
export const selectDealList = createSelector(selectDealState, (state) => state.deals);
export const selectDealById = (dealId: string) => createSelector(
    selectDealList,
    (deals) => deals.find(deal => deal.id === dealId)
  );