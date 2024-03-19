import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'app/app.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  product?: any
  data: any

  constructor(
    private service: Service, 
    private route: ActivatedRoute, 
    private router : Router) { }

  /** On init load product type by id and use the data to
   * prefill the update form
   */
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.service.getProduct(id).subscribe(data => {
      this.product = data
    })
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    quantity_min: new FormControl('', Validators.required),
    quantity_max: new FormControl('', Validators.required)
  })

  /** Get update data from form and init DB update  */
  submit(){
    this.data = this.form.value
    this.product.name = this.data.name
    this.product.quantity_min = this.data.quantity_min
    this.product.quantity_max = this.data.quantity_max
    this.service.updateProduct(this.product?.id, this.product).subscribe(data => {
      console.log(data)
    })
    this.router.navigate(['/']);
  }
}