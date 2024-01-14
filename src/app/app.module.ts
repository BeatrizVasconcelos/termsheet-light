import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DealListComponent } from './components/deal-list/deal-list.component';
import { DealDetailsComponent } from './components/deal-details/deal-details.component';
import { DealFormComponent } from './components/deal-form/deal-form.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { EffectsModule } from '@ngrx/effects';
import { dealsReducer } from './store/deal/deal.reducer';
import { DealEffects } from './store/deal/deal.effects';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DealListComponent,
    DealDetailsComponent,
    DealFormComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreModule.forFeature('deal', dealsReducer),
    EffectsModule.forFeature([DealEffects]),
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    NgxMaskDirective
    
  ],
  providers: [
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideEnvironmentNgxMask()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
