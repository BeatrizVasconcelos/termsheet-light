import { createAction, props } from '@ngrx/store';
import { Deal } from 'src/app/shared/interfaces/deal.interface';

export const getDeals = createAction('[Deal] Get Deals');
export const loadDealsSuccess = createAction('[Deal] Load Deals Success', props<{ deals: Deal[] }>());

export const loadDeal = createAction('[Deal] Load Deal', props<{ dealId: string }>());
export const loadDealSuccess = createAction('[Deal] Load Deal Success', props<{ deal: Deal }>());

export const addDeal = createAction('[Deal] Add Deal', props<{ deal: Deal }>());

export const editDeal = createAction('[Deal] Edit Deal', props<{ deal: Deal }>());

export const deleteDeal = createAction('[Deal] Delete Deal', props<{ dealId: string }>());
