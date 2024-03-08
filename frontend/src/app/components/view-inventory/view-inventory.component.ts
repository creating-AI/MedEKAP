import { Component } from '@angular/core';
import { Service} from 'app/app.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrl: './view-inventory.component.css'
})
export class ViewInventoryComponent {

  products: any | undefined;
  inventory: any | undefined;
  allData: any | undefined;

  constructor(
    private service: Service, 
    ) { 
  }

  ngOnInit(): void {
    this.service.getProducts().subscribe(data => {
      this.products = data;
      console.log(data)

      this.service.getInventory().subscribe(data => {
        this.inventory = data;
        console.log(data)
        this.completeInventory(this.inventory, this.products)
      });
    });
  }

  /*Determine the complete Medi Kit inventory*/
  completeInventory(invData: object, proData: object) {
    /*merge 'outOfDate' and 'products' arrays based on key*/
    this.allData = this.inventory.map((invItem: { product: number; }) => ({
      ...this.products.find((prodItem: { id: number; }) => (prodItem.id === invItem.product) && prodItem),
      ...invItem
    }));
  }

  /* Download Medi Kit inventory as PDF */
  printPDF() {
    const doc = new jsPDF();
    doc.text("Medi Kit Inventory",14, 10);
    autoTable(doc, { html: '#inventory_table' })
    doc.save('medi_kit.pdf')
  }
} 
