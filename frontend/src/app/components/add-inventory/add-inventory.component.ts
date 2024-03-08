import { Component } from '@angular/core';
import { Service } from 'app/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css'
})
export class AddInventoryComponent {
  product?: any
  data: any
  
  constructor(
    private service: Service, 
    private route: ActivatedRoute, 
    private router : Router) { }

  /* Get id from route to use it as a prefill for form product */
  ngOnInit(): void { 
    let id = this.route.snapshot.params['id'];
    this.service.getProduct(id).subscribe(data => {
      this.product = data
    })
  }

  form = new FormGroup({
    product: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    expiration_date: new FormControl(Date),
  });

  addInventory() {
    this.data = this.form.value;
    this.service.addInventory(this.data).subscribe(data => {
      this.router.navigate(['/']);
    });
  }
}