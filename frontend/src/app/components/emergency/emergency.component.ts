import { Component } from '@angular/core';
import { Service} from 'app/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.css'
})

export class EmergencyComponent {
  case: any | undefined
  data: any
  medication: any | undefined
  products: any | undefined
  
  showCustomEditor: boolean = false
  showActionPlan: boolean = false
  showProtocolForm: boolean = false
  showEmergencySelection: boolean = true

  availableMed: any | []
  notAvailableMed: any | []

  constructor(
    private service: Service,
    ) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }

  /** Create a canvas from HTML and save it as PDF */
  printProtocolPDF() {
    let data = document.getElementById('protocol');
    console.log(data);
    if (data != null) {
      html2canvas(data).then((canvas) => {
        const contentDataURL = canvas.toDataURL('image/png', 1.0);
        console.log(contentDataURL);
        let doc = new jsPDF('p', 'cm', 'a4');
        doc.addImage(contentDataURL, 'PNG', 1, 1, 19.0, 27.7);
        doc.save('Protocol.pdf');
      });
    }
  }

  /** Get case specific data (action plans and medication) by id */
  emergencyCase(id: number){
    this.service.getEmergencyById(id).subscribe(data => {
      this.case = data;
      if(this.case.custom == ''){
        this.case.custom = 'Enter your individual action plan here (max. 1000 characters)'
      }
      console.log(data)
    });

    this.service.getMedicationListById(id).subscribe(data => {
      this.medication = data;
      console.log(data)

      this.availableMedicine(this.medication, this.products);
    });
    this.setActionPlanVisible()
  }

  /** Determine which case-specific medicine is available and which is not 
   * by comparing predefined case-specific medicine against inventory
   */
  availableMedicine(mediData: Object, prodData: Object){
    this.availableMed=[]
    this.notAvailableMed=[]

    Object.values(mediData).forEach(mediValue =>{
      var medNotFound = true
      
      Object.values(prodData).forEach(prodValue =>{
        if(mediValue.medicine == prodValue.name && prodValue.quantity_stock > 0){
          this.availableMed.push(mediValue.medicine)
          medNotFound = false
        }
      })

      if(medNotFound){
        this.notAvailableMed.push(mediValue.medicine)
      }
    })
    console.log(this.availableMed);
    console.log(this.notAvailableMed);
  }
  
 /** Update the text of the custom action plan through form entry */
  form = new FormGroup({
    custom: new FormControl('', Validators.required)
  })

  updateCase(){
    this.data = this.form.value
    this.case.custom = this.data.custom

    this.service.updateEmergency(this.case?.id, this.case).subscribe(data => {
      console.log(data)
    })
  }

  /** The remaining code shows/hides GUI elements by setting or toggling booleans */
  setActionPlanVisible() {
    this.showActionPlan = true;
  }

  setActionPlanNotVisible() {
    this.showActionPlan = false;
  }

  toggleCustomEditor(textarea: HTMLTextAreaElement) {
    this.showCustomEditor = !this.showCustomEditor;
    textarea.hidden = !textarea.hidden;
  }

  setCustomEditorOff(textarea: HTMLTextAreaElement) {
    this.showCustomEditor = false;
    textarea.hidden = true;
  }
  
  toggleEmergencySelection() {
    this.showEmergencySelection = !this.showEmergencySelection;
  }

  toggleProtocolForm() {
    this.showProtocolForm = !this.showProtocolForm;
  }
}
