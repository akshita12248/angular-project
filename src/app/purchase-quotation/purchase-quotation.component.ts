import { Component, OnInit } from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";



@Component({
  selector: "app-purchase-quotation",
  templateUrl: "./purchase-quotation.component.html",
  styleUrls: ["./purchase-quotation.component.css"]
})
export class PurchaseQuotationComponent implements OnInit {
  constructor(private fb: FormBuilder){}
 purchaseForm: FormGroup;
 
  myControl = new FormControl();
  options: string[] = ["123", "456", "789"];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

     this.purchaseForm=new FormGroup({
     invoiceNo :new FormControl('',Validators.required),
     date:new FormControl('',Validators.required),
     dueDate:new FormControl('',Validators.required),
     invNumber:new FormControl('',[Validators.required,
     CustomValidator.numeric]),
     conversionRate:new FormControl('',[Validators.required,
     CustomValidator.numeric]),
     currency:new FormControl('',Validators.required),
     })
      // this.purchaseForm = this.fb.group({
      // invoiceNo: ['', Validators.required]});
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
  addNewAddress() {
    let row = document.createElement("input");
    document.querySelector(".address").appendChild(row);
  }
}


export class CustomValidator{
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };
    return null;
  }
}