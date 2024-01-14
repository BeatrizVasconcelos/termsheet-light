import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealListComponent } from './components/deal-list/deal-list.component';
import { DealFormComponent } from './components/deal-form/deal-form.component';
import { DealDetailsComponent } from './components/deal-details/deal-details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list-deals', component: DealListComponent },
  { path: 'add-deal', component: DealFormComponent },
  { path: 'add-deal/:dealId', component: DealFormComponent },
  { path: 'deal-details/:dealId', component: DealDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
