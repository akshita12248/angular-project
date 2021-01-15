import { Component, Input, OnInit } from "@angular/core";
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
  @Input() deviceXs: boolean;
  myControl = new FormControl();
  options: string[] = ["123", "456", "789"];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.voucherForm = this.fb.group({
      invoiceNo: ["", Validators.required],
      account: ["", Validators.required],
      date: ["", Validators.required],
      dueDate: ["", Validators.required],
      invNumber: ["", [Validators.required, CustomValidator.numeric]],
      conversionRate: ["", [Validators.required, CustomValidator.numeric]],
      currency: ["", Validators.required],
      desc: ["", Validators.required],
      skills: this.fb.array([this.addSkillFormGroup()])
    });
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
      taxableAmount: [""],
      cgstTaxableAmount: [""],
      sgstTaxableAmount: [""],
      cessTaxableAmount: [""],
      finalAmount: [""],
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

  getDateError() {
    if (this.voucherForm.get("date").hasError("required")) {
      return "Date is required";
    }
  }

  getDueDateError() {
    if (this.voucherForm.get("dueDate").hasError("required")) {
      return "Due Date is required";
    }
  }

  getInvoiceNoError() {
    if (this.voucherForm.get("invoiceNo").hasError("required")) {
      return "Invoice No. is required";
    }
  }

  getAccountError() {
    if (this.voucherForm.get("account").hasError("required")) {
      return "Account is required";
    }
  }

  getConversionRateError() {
    if (this.voucherForm.get("conversionRate").hasError("required")) {
      return "Conversion Rate is required";
    } else {
      return "Contains only numeric digits";
    }
  }

  getDescriptionError() {
    if (this.voucherForm.get("desc").hasError("required")) {
      return "Description is required";
    }
  }

  getCurrencyError() {
    if (this.voucherForm.get("currency").hasError("required")) {
      return "Currency is required";
    }
  }

  getinvNumber() {
    if (this.voucherForm.get("invNumber").hasError("required")) {
      return "No. is required";
    } else {
      return "Contains only numeric digits";
    }
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
