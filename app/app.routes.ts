import { Routes } from '@angular/router';
import { AddressListComponent } from './component/address-list/address-list.component'; 
import { AddressFormComponent } from './component/address-form/address-form.component'; 
import { AddressDetailsComponent } from './component/address-details/address-details.component'; 
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch:'full'},
  { path: 'addresses', component: AddressListComponent },
  { path: 'addresses/new', component: AddressFormComponent },
  { path: 'addresses/edit/:id', component: AddressFormComponent },
  { path: 'addresses/:id', component: AddressDetailsComponent }
];