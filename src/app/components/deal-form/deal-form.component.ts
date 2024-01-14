import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DealEnum } from 'src/app/shared/enums/deal.enum';
import { Deal } from 'src/app/shared/interfaces/deal.interface';
import { DealService } from 'src/app/shared/services/deal.service';
import * as fromDeals from '../../store/deal/index';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-deal-form',
  templateUrl: './deal-form.component.html',
  styleUrls: ['./deal-form.component.scss'],
})
export class DealFormComponent implements OnInit {
  public dealTypes: DealEnum[] = [
    DealEnum.ACQUISITION,
    DealEnum.DEVELOPMENT,
    DealEnum.LEASE,
  ];
  public dealForm: FormGroup = new FormGroup({});
  public dealId: string | null = null;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dealService: DealService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dealId = this.activatedRoute.snapshot.paramMap.get('dealId');
    this.loadForm();
    this.loadExistingDeal();
  }

  loadForm(): void {
    this.dealForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      purchasePrice: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      address: ['', Validators.required],
      noi: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  loadExistingDeal(): void {
    if (this.dealId) {
      this.store
        .select(fromDeals.selectDealById(this.dealId))
        .subscribe((existingDeal) => {
          if (existingDeal) {
            console.log(existingDeal);
            this.dealForm.patchValue({
              name: existingDeal.name,
              type: existingDeal.type,
              purchasePrice: existingDeal.purchasePrice,
              address: existingDeal.address,
              noi: existingDeal.noi,
            });
          }
        });
    }
  }

  addNewDeal(): void {
    if (this.dealForm.valid) {
      const deal: Deal = {
        id: this.dealId || Math.round(Math.random()).toString(),
        name: this.dealForm.get('name')?.value,
        type: this.dealForm.get('type')?.value,
        purchasePrice: parseFloat(this.dealForm.get('purchasePrice')?.value),
        address: this.dealForm.get('address')?.value,
        noi: parseFloat(this.dealForm.get('noi')?.value),
      };

      deal.capRate = Number(
        this.dealService
          .calculateCapRate(deal.noi, deal.purchasePrice)
          .toFixed(2)
      );

      if (this.dealId) {
        this.store.dispatch(
          fromDeals.editDeal({
            deal: deal,
          })
        );
      } else {
        this.isLoading$.next(true);
        this.store.dispatch(
          fromDeals.addDeal({
            deal: deal,
          })
        );
        this.dealForm.reset();
      }
      this.isLoading$.next(false);
      this.openSnackBar();
    }
  }

  openSnackBar(): void {
    this._snackBar.open(
      this.dealId
        ? 'The deal was successfully updated!'
        : 'The deal was created!',
      'Close',
      {
        duration: 2000,
      }
    );
  }

  goBack(): void {
    this.router.navigateByUrl('/list-deals');
  }
}
