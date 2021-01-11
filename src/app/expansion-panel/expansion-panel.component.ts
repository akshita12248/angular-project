import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-expansion-panel",
  templateUrl: "./expansion-panel.component.html",
  styleUrls: ["./expansion-panel.component.css"]
})
export class ExpansionPanelComponent implements OnInit {
  panelOpenState = false;

  @Input() formGroup: FormGroup;
  @Input() parentFormGroup: FormGroup;
  @Input() parentData: number;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  addSubItem(skill: FormGroup): void {
    (<FormArray>skill.get("subItem")).push(this.addSubItemGroup());
  }

  addBillSundryClick(skill: FormGroup): void {
    (<FormArray>skill.get("bills")).push(this.addBillFormGroup());
  }

  removeSkillButtonClick(): void {
    const skillsFormArray = <FormArray>this.parentFormGroup.get("skills");
    skillsFormArray.removeAt(this.parentData);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
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
      cgstTaxableAmount:[""],
      sgstTaxableAmount:[""],
      cessTaxableAmount:[""],
      finalAmount:[""],
      bills: this.fb.array([this.addBillFormGroup()]),
      subItem: this.fb.array([this.addSubItemGroup()])
    });
  }
  addSubItemGroup(): FormGroup {
    return this.fb.group({
      subSerialNo: ["", Validators.required],
      subDescription: ["", Validators.required],
      subQuantity: ["", Validators.required]
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

  getItemError() {
    if (this.formGroup.get("item").hasError("required")) {
      return "Item is required";
    }
  }

  getUomError() {
    if (this.formGroup.get("uom").hasError("required")) {
      return "UOM is required";
    }
  }

  getPriceError() {
    if (this.formGroup.get("price").hasError("required")) {
      return "Price is required";
    }
  }

  getQuantityError() {
    if (this.formGroup.get("quantity").hasError("required")) {
      return "Quantity is required";
    }
  }

  getLotNoError() {
    if (this.formGroup.get("lotNo").hasError("required")) {
      return "Lot No is required";
    }
  }

  getTaxError() {
    if (this.formGroup.get("tax").hasError("required")) {
      return "Tax is required";
    }
  }

  getAmountError() {
    if (this.formGroup.get("amount").hasError("required")) {
      return "Amount is required";
    }
  }

  getSerialNoError() {
    if (this.formGroup.get("subSerialNo").hasError("required")) {
      return "S.No is required";
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
