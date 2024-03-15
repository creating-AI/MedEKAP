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
  /** home */
  {path: '', component: ViewProductComponent}, 
  /** printable complete inventory list */
  {path: 'inventory', component: ViewInventoryComponent},
  /** add a product type form */
  {path: 'addproduct', component: AddProductComponent},
  /** update a product type form; id = product type id */
  {path: 'updateproduct/:id', component: UpdateProductComponent},
  /** add an inventory item form; id = product id (to relate the item to a type) */
  {path: 'addinventory/:id', component: AddInventoryComponent},
  /** update an inventory item form; id = inventory item id */
  {path: 'updateinventory/:id', component: UpdateInventoryComponent},
  /** all emergency content at one place */
  {path: 'emergency', component: EmergencyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }