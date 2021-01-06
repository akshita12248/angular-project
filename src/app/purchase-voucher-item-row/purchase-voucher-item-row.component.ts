import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-purchase-voucher-item-row",
  templateUrl: "./purchase-voucher-item-row.component.html",
  styleUrls: ["./purchase-voucher-item-row.component.css"]
})
export class PurchaseVoucherItemRowComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  voucherForm: FormGroup;
  ngOnInit() {
    this.voucherForm = this.fb.group({
      skills: this.fb.array([this.addSkillFormGroup()])
    });
    console.log(this.voucherForm);
    // [bills:this.fb.array
    // ([this.addBillSundryGroup()])]});
  }
  get formArray() {
    return <FormArray>this.voucherForm.get("formArray");
  }

  addSkillButtonClick(): void {
    (<FormArray>this.voucherForm.get("skills")).push(this.addSkillFormGroup());
  }

  addBillSundryClick(skill: FormGroup): void {
    (<FormArray>skill.get("bills")).push(this.addBillFormGroup());
  }
  addSubItem(skill: FormGroup): void {
    (<FormArray>skill.get("subItem")).push(this.addSubItemGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      item: ["", Validators.required],
      uom: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required],
      lotNo: ["", Validators.required],
      tax: ["", Validators.required],
      effectiveAmount: [""],
      bills: this.fb.array([this.addBillFormGroup()]),
      subItem: this.fb.array([this.addSubItemGroup()])
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
  addSubItemGroup(): FormGroup {
    return this.fb.group({
      subQuantity: ["", Validators.required],
      subSerialNo: ["", Validators.required],
      subDescription: ["", Validators.required]
    });
  }

  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.voucherForm.get("skills");
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }
  removeVoucherButtonClick(skill: FormGroup, voucherGroupIndex: number): void {
    const billsFormArray = <FormArray>skill.get("bills");
    billsFormArray.removeAt(voucherGroupIndex);
    billsFormArray.markAsDirty();
    billsFormArray.markAsTouched();
  }
  removeSubItemButtonClick(skill: FormGroup, subItemGroupIndex: number): void {
    const sunItemFormArray = <FormArray>skill.get("subItem");
    sunItemFormArray.removeAt(subItemGroupIndex);
    sunItemFormArray.markAsDirty();
    sunItemFormArray.markAsTouched();
  }
}
