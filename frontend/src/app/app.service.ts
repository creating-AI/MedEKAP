import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './Products';
import { Inventory } from './Inventory';
import { Emergency } from './Emergency';
import { Medication } from './Medication';

@Injectable({
  providedIn: 'root'
})

export class Service {

  /** URLs used to access the backend for local use
  private url_products: string = 'http://localhost:8000/api/products/';
  private url_inventory: string = 'http://localhost:8000/api/inventory/';
  private url_inventorylistbyid: string = 'http://localhost:8000/api/inventorylistbyid/';
  private url_location: string = 'http://localhost:8000/api/location/';
  private url_emergency: string = 'http://localhost:8000/api/emergency/';
  private url_medicationlistbyid: string = 'http://localhost:8000/api/medicationlistbyid/';
   */

  /** URLs used to access the backend for AWS EC2 use*/
  private url_products: string = 'http://18.185.47.68:8000/api/products/';
  private url_inventory: string = 'http://18.185.47.68:8000/api/inventory/';
  private url_inventorylistbyid: string = 'http://18.185.47.68:8000/api/inventorylistbyid/';
  private url_location: string = 'http://18.185.47.68:8000/api/location/';
  private url_emergency: string = 'http://18.185.47.68:8000/api/emergency/';
  private url_medicationlistbyid: string = 'http://18.185.47.68:8000/api/medicationlistbyid/';

  constructor(private http: HttpClient) { }

  /** Services related to emergencies and associated medication */
  getMedicationListById(id: number): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.url_medicationlistbyid}${id}/`);
  }
  
  getEmergency(): Observable<Emergency[]> {
    return this.http.get<Emergency[]>(this.url_emergency);
  }

  getEmergencyById(id: number): Observable<Emergency> {
    return this.http.get<Emergency>(`${this.url_emergency}${id}/`);
  }

  updateEmergency(id: number, emergency: Emergency): Observable<Emergency> {
    return this.http.put<Emergency>(`${this.url_emergency}${id}/`, emergency);
  }

  
  /** Product (type) related services */
  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.url_products);
  }
  
  addProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(this.url_products, product);
  }

  getProduct(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.url_products}${id}/`);
  }

  updateProduct(id: number, product: Products): Observable<Products> {
    return this.http.put<Products>(`${this.url_products}${id}/`, product);
  }

  deleteProduct(id: number): Observable<Products> {
    return this.http.delete<Products>(`${this.url_products}${id}/`);
  }

  
  /** Inventory (item) related services */
  addInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.url_inventory, inventory);
  }

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.url_inventory);
  }

  updateInventory(id: number, inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.url_inventory}${id}/`, inventory);
  }

  deleteInventory(id: number): Observable<Inventory> {
    return this.http.delete<Inventory>(`${this.url_inventory}${id}/`);
  }

  getInventoryById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.url_inventory}${id}/`);
  }

  getInventoryListById(id: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.url_inventorylistbyid}${id}/`);
  }


 /** Medi Kit location related services */
  getLocation(): Observable<Location> {
    return this.http.get<Location>(this.url_location);
  }

  updateLocation(id: number, location: Location): Observable<Location> {
    return this.http.put<Location>(`${this.url_location}${id}/`, location);
  }
}
