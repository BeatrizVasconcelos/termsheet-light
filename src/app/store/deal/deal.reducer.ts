import { createReducer, on } from '@ngrx/store';
import { addDeal, deleteDeal, editDeal, getDeals } from './deals.actions';
import { deals } from 'src/app/mocks/deals';
import { DealState } from './deal-state.interface';

export const initialState: DealState = {
  deals: deals
};

export const dealsReducer = createReducer(
  initialState,
  on(getDeals, (state) => ({...state, deals: [...state.deals]})),
  on(addDeal, (state, { deal }) => ({ ...state, deals: [...state.deals, deal] })),
  on(editDeal, (state, { deal }) => {
    const updatedDeals = state.deals.map(d => (d.id === deal.id ? deal : d));
    return { ...state, deals: updatedDeals };
  }),
  on(deleteDeal, (state, { dealId }) => {
    const updatedDeals = state.deals.filter(deal => deal.id !== dealId);
    return { ...state, deals: updatedDeals };
  })
);
