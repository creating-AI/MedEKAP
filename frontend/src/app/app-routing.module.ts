import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { UpdateInventoryComponent } from './components/update-inventory/update-inventory.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ViewInventoryComponent } from './components/view-inventory/view-inventory.component';
import { EmergencyComponent } from './components/emergency/emergency.component';

const routes: Routes = [
  {path: '', component: ViewProductComponent},
  {path: 'add', component: AddProductComponent},
  {path: 'update/:id', component: UpdateProductComponent},

  {path: 'inventory', component: ViewInventoryComponent},
  {path: 'addinventory', component: AddInventoryComponent},
  {path: 'addinventory/:id', component: AddInventoryComponent},
  {path: 'updateinventory/:id', component: UpdateInventoryComponent},

  {path: 'emergency', component: EmergencyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }