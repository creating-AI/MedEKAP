import { Component } from '@angular/core';
import { Service } from 'app/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent {
  constructor(private service: Service, private router: Router) { }
  
  ngOnInit(): void { }

  data: any

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    quantity_min: new FormControl('', Validators.required),
    quantity_max: new FormControl('', Validators.required),
    quantity_stock: new FormControl('0')
  });

  /** Add a new product type using the data from the form */
  addProduct() {
    this.data = this.form.value;
    this.service.addProduct(this.data).subscribe(data => {
      this.router.navigate(['/']);
    });
  }
}
