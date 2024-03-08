import { Component } from '@angular/core';
import { Service} from 'app/app.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  product: any | undefined
  products: any | undefined
  inventory: any | undefined
  inventoryAll: any | undefined
  
  location: any | undefined
  locData: any

  show: boolean = false
  showStockAlert: boolean = false
  showOutOfDateAlert: boolean = false
  showLocationEditor: boolean = false

  lowStock: any | []
  outOfDate: any | []

  constructor(
    private service: Service, private router : Router,
    ) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(data => {
      this.products = data;
      console.log(data)
      
      /*Determine products with low stock and save them in lowStock array*/
      this.lowStockSearch(this.products);

      /*Determine out of date inventory and save them in outOfDate array*/
      this.service.getInventory().subscribe(data => {
        this.inventoryAll = data;
        console.log(data)
        this.outOfDateSearch(this.inventoryAll)
      });

      /*Get actual Medi Kit location*/
      this.service.getLocation().subscribe(data => {
        this.location = data;
        console.log('Location:')
        console.log(data)
      }); 
    });
  }

  /* form for updating Medi Kit Location */
  locForm = new FormGroup({
    location: new FormControl('', Validators.required),
  })
  
  /* Update Medi Kit Location */
  submit(){
    this.locData = this.locForm.value
    this.location[0].location = this.locData.location
    this.service.updateLocation(this.location[0].id, this.location[0]).subscribe(data => {
      console.log(data)
    })
  }

  /*Determine out of date inventory and save them in outOfDate array*/
  outOfDateSearch(data: object) {
    /*determine actual date*/
    var date = new Date();
    var dateToday = date.toISOString().split('T')[0];
    console.log(dateToday);
    
    /*find expired items*/
    this.outOfDate=[],
    Object.values(data).forEach(value =>{
      if(value.expiration_date < dateToday){
        this.outOfDate = this.outOfDate.concat(value);
      }
    })
    console.log(this.outOfDate);

    /*merge 'outOfDate' and 'products' arrays based on key*/
    this.outOfDate = this.outOfDate.map((itm: { product: number; }) => ({
      ...this.products.find((item: { id: number; }) => (item.id === itm.product) && item),
      ...itm
    }));
    console.log(this.outOfDate);

    /* Show/hide expired items*/ 
    if(this.outOfDate.length == 0){
      this.showOutOfDateAlert = false;
    }
    else {this.showOutOfDateAlert = true;}
  }

  /*Determine products with low stock and save them in lowStock array*/
  lowStockSearch(data: object) {
    this.lowStock=[];
    Object.values(data).forEach(value =>{
      if(value.quantity_min>value.quantity_stock){
        this.lowStock = this.lowStock.concat(value);
      }
    })

    /* Show/hide low stock alert*/
    if(this.lowStock.length == 0){
      this.showStockAlert = false;
    }
    else {this.showStockAlert = true;}
    
    console.log(this.lowStock);
  }

  deleteProduct(id: number) {
    this.service.deleteProduct(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
      /*hide viewInventoryById when product, and thus all inventory is deleted*/
      this.show = !this.show;
    });
  }

  viewInventoryById(id: number) {
    this.service.getProduct(id).subscribe(data => {
      this.product = data;
      console.log(data)
    });
    this.service.getInventoryListById(id).subscribe(data => {
      this.inventory = data;
      console.log(data)
    });
  }

  deleteInventory(id: number, product: number) {
    this.service.deleteInventory(id).subscribe(data => {
      console.log(data);
      this.viewInventoryById(product);
      this.ngOnInit();
    });
  }

  toggleShow(): void {
    if (this.show == false) {
      this.show = !this.show;
    }
  }
  
  toggleLocationEditor() {
    this.showLocationEditor = !this.showLocationEditor;
  }
} 