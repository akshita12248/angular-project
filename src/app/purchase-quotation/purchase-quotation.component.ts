import { Component, OnInit } from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-purchase-quotation",
  templateUrl: "./purchase-quotation.component.html",
  styleUrls: ["./purchase-quotation.component.css"]
})
export class PurchaseQuotationComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  voucherForm: FormGroup;

  myControl = new FormControl();
  options: string[] = ["123", "456", "789"];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    this.voucherForm = this.fb.group({
      invoiceNo: ["", Validators.required],
      date: ["", Validators.required],
      dueDate: ["", Validators.required],
      invNumber: ["", [Validators.required, CustomValidator.numeric]],
      conversionRate: ["", [Validators.required, CustomValidator.numeric]],
      currency: ["", Validators.required],
      skills: this.fb.array([this.addSkillFormGroup()])
    });
    // this.purchaseForm = this.fb.group({
    // invoiceNo: ['', Validators.required]});
  }
  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      item: ["", Validators.required],
      uom: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required],
      lotNo: ["", Validators.required],
      tax: ["", Validators.required],
      amount: ["", Validators.required],
      effectiveAmount: [""],
      bills: this.fb.array([this.addBillFormGroup()]),
      subItem: this.fb.array([this.addSubItemGroup()])
    });
  }
  addSubItemGroup(): FormGroup {
    return this.fb.group({
      subQuantity: ["", Validators.required],
      subSerialNo: ["", Validators.required],
      subDescription: ["", Validators.required]
    });
  }

  addBillFormGroup(): FormGroup {
    return this.fb.group({
      billSundry: ["", Validators.required],
      value: ["", Validators.required],
      amount: ["", Validators.required],
      desc: ["", Validators.required]
    });
  }
  addSkillButtonClick(): void {
    (<FormArray>this.voucherForm.get("skills")).push(this.addSkillFormGroup());
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

export class CustomValidator {
  
  static numeric(control: AbstractControl) {
    let val = control.value;
    if (val === null || val === "") return null;
    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };
    return null;
  }
}
