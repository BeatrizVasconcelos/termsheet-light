import { Injectable } from '@angular/core';
import { Deal } from '../interfaces/deal.interface';
import { Observable, of } from 'rxjs';
import { deals } from 'src/app/mocks/deals';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  private deals: Deal[] = deals;

  constructor() {}

  calculateCapRate(noi: number, purchasePrice: number) {
    if (purchasePrice !== 0) {
      return (noi / purchasePrice) * 100;
    }

    return 0;
  }

  getDeals(): Observable<Deal[]> {
    return of(this.deals);
  }

  addNewDeal(deal: Deal): Observable<Deal> {
    this.deals = [...this.deals, deal];

    return of(deal);
  }

  editDeal(editingDeal: Deal): Observable<Deal> {
    this.deals.map((deal) => {
      deal.id === editingDeal.id ? editingDeal : deal;
    });

    return of(editingDeal);
  }

  deleteDeal(dealId: string): Observable<Deal> {
    this.deals = this.deals.filter((d) => d.id !== dealId);
    return of();
  }

  getDealById(dealId: string): Observable<Deal> {
    const deal = this.deals.find((d) => d.id === dealId);
    return of(deal || ({} as Deal));
  }
}
