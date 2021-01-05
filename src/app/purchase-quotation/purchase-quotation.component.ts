import { Component, OnInit } from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { FormControl } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";



@Component({
  selector: "app-purchase-quotation",
  templateUrl: "./purchase-quotation.component.html",
  styleUrls: ["./purchase-quotation.component.css"]
})
export class PurchaseQuotationComponent implements OnInit {
 
  myControl = new FormControl();
  options: string[] = ["123", "456", "789"];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
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
