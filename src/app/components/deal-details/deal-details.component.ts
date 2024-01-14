import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Deal } from 'src/app/shared/interfaces/deal.interface';
import { selectDealById } from 'src/app/store/deal';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss'],
})
export class DealDetailsComponent implements OnInit {
  public dealId: string | null = null;
  public deal: Deal | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dealId = this.activatedRoute.snapshot.paramMap.get('dealId');
    this.loadDealDetails();
  }

  loadDealDetails(): void {
    if (this.dealId) {
      this.store.select(selectDealById(this.dealId)).subscribe((deal) => {
        if (deal) {
          this.deal = deal;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }
}
