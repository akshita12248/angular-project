import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-expansion-panel",
  templateUrl: "./expansion-panel.component.html",
  styleUrls: ["./expansion-panel.component.css"]
})
export class ExpansionPanelComponent implements OnInit {
  panelOpenState = false;
  voucherForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.voucherForm = this.fb.group({
      skills: this.fb.array([this.addSkillFormGroup()])
    });
  }
  addSkillButtonClick(): void {
    (<FormArray>this.voucherForm.get("skills")).push(this.addSkillFormGroup());
  }

  addSubItem(skill: FormGroup): void {
    (<FormArray>skill.get("subItem")).push(this.addSubItemGroup());
  }

  addBillSundryClick(skill: FormGroup): void {
    (<FormArray>skill.get("bills")).push(this.addBillFormGroup());
  }

  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.voucherForm.get("skills");
    skillsFormArray.removeAt(skillGroupIndex);
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
      // effectiveAmount: [""],
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
}
