import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Deal } from 'src/app/shared/interfaces/deal.interface';
import * as fromDeals from '../../store/deal/index';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss'],
})
export class DealListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'type',
    'purchasePrice',
    'address',
    'noi',
    'capRate',
    'actions',
  ];
  dataSource: MatTableDataSource<Deal> = new MatTableDataSource<Deal>();
  deals$: Observable<Deal[]> = new Observable<Deal[]>();

  filterNameControl: FormControl = new FormControl('');
  filterTypeControl: FormControl = new FormControl('');
  filterCapRateControl: FormControl = new FormControl('');

  private destroy$: Subject<void> = new Subject<void>();
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.getDeals();
    this.initSubscriptions();
    this.applyFiltering();
  }

  private getDeals(): void {
    this.isLoading$.next(true);
    this.store.dispatch(fromDeals.getDeals());
    this.isLoading$.next(false);
  }

  private initSubscriptions(): void {
    this.deals$ = this.store.pipe(select(fromDeals.selectDealList));
    this.deals$.pipe(takeUntil(this.destroy$)).subscribe((deals) => {
      this.dataSource.data = deals;
    });
  }

  public goToAddDealPage(): void {
    this.router.navigateByUrl('/add-deal');
  }

  public goToDealDetailsPage(dealId: string): void {
    this.router.navigateByUrl(`/deal-details/${dealId}`);
  }

  public goToEditPage(dealId: string): void {
    this.router.navigateByUrl(`/add-deal/${dealId}`);
  }

  public goToHomePage(): void {
    this.router.navigateByUrl('');
  }

  public deleteDeal(dealId: string): void {
    this.store.dispatch(fromDeals.deleteDeal({ dealId }));
  }

  private applyFiltering(): void {
    this.filterNameControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((filterValue) => {
        this.dataSource.filterPredicate = this.createFilter(
          'name',
          filterValue
        );
        this.dataSource.filter = filterValue;
      });

    this.filterTypeControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((filterValue) => {
        this.dataSource.filterPredicate = this.createFilter(
          'type',
          filterValue
        );
        this.dataSource.filter = filterValue;
      });

    this.filterCapRateControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((filterValue) => {
        this.dataSource.filterPredicate = this.createFilter(
          'capRate',
          filterValue
        );
        this.dataSource.filter = filterValue;
      });
  }

  private createFilter(
    column: string,
    filterValue: string | number
  ): (data: any, filter: string) => boolean {
    const filterFunction = (data: any, filter: string): boolean => {
      const dataValue = data[column].toString().toLowerCase();
      return dataValue.includes(filterValue.toString().toLowerCase());
    };
    return filterFunction;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
