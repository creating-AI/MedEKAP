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
  emergency: any | undefined
  case: any | undefined
  data: any
  medication: any | undefined
  products: any | undefined
  showCustomEditor: boolean = false
  showActionPlan: boolean = false
  showProtocolForm: boolean = false
  showEmergencySelection: boolean = true
  protocolMeasures: string = ''

  availableMed: any | []
  notAvailableMed: any | []

  constructor(
    private service: Service,
    ) { }

  ngOnInit(): void {
    this.service.getEmergency().subscribe(data => {
      this.emergency = data;
      console.log(data)

      this.service.getProducts().subscribe(data => {
        this.products = data;
        console.log(data);
      });
    });
  }

  printPDF() {
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
  }

  // determine which case specific medicine is available and which not
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
  
  // update custom action plan
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
