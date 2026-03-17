import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';

export const routes: Routes = [
  { path: '',         redirectTo: 'orders', pathMatch: 'full' },
  { path: 'orders',   component: OrderListComponent },
  { path: 'proposals/create', component: CreateProposalComponent },
];
