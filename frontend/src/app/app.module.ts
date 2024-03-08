import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { UpdateInventoryComponent } from './components/update-inventory/update-inventory.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ViewInventoryComponent } from './components/view-inventory/view-inventory.component';
import { EmergencyComponent } from './components/emergency/emergency.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddProductComponent,
    AddInventoryComponent,
    UpdateProductComponent,
    UpdateInventoryComponent,
    ViewProductComponent,
    ViewInventoryComponent,
    EmergencyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }