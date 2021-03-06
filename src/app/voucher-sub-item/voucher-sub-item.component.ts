import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: "app-voucher-sub-item",
  templateUrl: "./voucher-sub-item.component.html",
  styleUrls: ["./voucher-sub-item.component.css"]
})
export class VoucherSubItemComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() parentFormGroup: FormGroup;
  @Input() parentData: number;
  constructor() {}

  ngOnInit() {}

  removeSubItemButtonClick(
    parentFormGroup: FormGroup,
    subItemGroupIndex: number
  ): void {
    const sunItemFormArray = <FormArray>parentFormGroup.get("subItem");
    sunItemFormArray.removeAt(subItemGroupIndex);
    sunItemFormArray.markAsDirty();
    sunItemFormArray.markAsTouched();
  }

  getSerialNoError() {
    if (this.formGroup.get("subSerialNo").hasError("required")) {
      return "S.No is required";
    } 
  }

  getDescriptionError() {
    if (this.formGroup.get("subDescription").hasError("required")) {
      return "Description is required";
    } 
  }

  getQuantityError() {
    if (this.formGroup.get("subQuantity").hasError("required")) {
      return "Qnty is required";
    } 
  }
}
