import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: "app-voucher-bill-sundry",
  templateUrl: "./voucher-bill-sundry.component.html",
  styleUrls: ["./voucher-bill-sundry.component.css"]
})
export class VoucherBillSundryComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() parentFormGroup: FormGroup;
  @Input() parentData: number;
  constructor() {}

  ngOnInit() {}

  removeVoucherButtonClick(
    parentFormGroup: FormGroup,
    voucherGroupIndex: number
  ): void {
    const billsFormArray = <FormArray>parentFormGroup.get("bills");
    billsFormArray.removeAt(voucherGroupIndex);
    billsFormArray.markAsDirty();
    billsFormArray.markAsTouched();
  }
}
