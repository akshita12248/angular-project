import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css']
})
export class ExpansionPanelComponent implements OnInit {
panelOpenState = false;
 voucherForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
     this.voucherForm = this.fb.group({
      skills: this.fb.array([this.addSkillFormGroup()])
    });
  }
  addSkillButtonClick(): void {
    (<FormArray>this.voucherForm.get("skills")).push(this.addSkillFormGroup());
  }


   addSkillFormGroup(): FormGroup {
    return this.fb.group({
      item: ["", Validators.required],
      uom: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required],
      lotNo: ["", Validators.required],
      tax: ["", Validators.required],
      amount:["",Validators.required]
      // effectiveAmount: [""],
      // bills: this.fb.array([this.addBillFormGroup()]),
      // subItem: this.fb.array([this.addSubItemGroup()])
    });
  }

}