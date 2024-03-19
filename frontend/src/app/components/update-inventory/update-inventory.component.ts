import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'app/app.service';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrl: './update-inventory.component.css'
})

export class UpdateInventoryComponent {
  inventory?: any
  data: any

  constructor(
    private service: Service, 
    private route: ActivatedRoute, 
    private router : Router) {}

  /** On init load inventory item by id and use the data to
   * prefill the update form
   */
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.service.getInventoryById(id).subscribe(data => {
      this.inventory = data
    })
  }

  form = new FormGroup({
    product: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    expiration_date: new FormControl('', Validators.required)
  })

  /** Get update data from form and init DB update  */
  submit(){
    this.data = this.form.value
    this.inventory.product = this.data.product
    this.inventory.quantity = this.data.quantity
    this.inventory.expiration_date = this.data.expiration_date
    this.service.updateInventory(this.inventory?.id, this.inventory).subscribe(data => {
      console.log(data)
      this.router.navigate(['/']);
    })
  }
}

